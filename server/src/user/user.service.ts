import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { FilesService } from 'src/files/files.service';
import { RequestUser } from 'src/types';
import { UserFriendRequest } from './entities/user-relation.entity';
import { RemoveRoleDto } from 'src/user/dto/remove-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserFriendRequest)
    private userFriendRequestRepository: Repository<UserFriendRequest>,
    private roleService: RoleService,
    private filesService: FilesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userRole = await this.roleService.findByName('USER');
    if (!userRole) {
      throw new HttpException(
        "Can't find user role",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const entity = await this.userRepository.create(createUserDto);
    const res = await this.userRepository.save({
      ...entity,
      roles: [userRole],
    });
    return res;
  }

  async addRole(id: string, addRoleDto: AddRoleDto) {
    const newRole = await this.roleService.findByName(addRoleDto.roleName);
    const entity = await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
      },
    });

    if (!entity || !newRole) {
      throw new HttpException(
        'Неизвестная ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const res = await this.userRepository.save({
      ...entity,
      roles: [...entity.roles, newRole],
    });
    return res;
  }

  async removeRole(id: string, removeRoleDto: RemoveRoleDto) {
    const roleToDelete = await this.roleService.findByName(removeRoleDto.roleName);
    const entity = await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
      },
    });

    if (!entity || !roleToDelete) {
      throw new HttpException(
        'Неизвестная ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newRoles = entity.roles.filter(role => role.id !== roleToDelete.id)

    const res = await this.userRepository.save({
      ...entity,
      roles: newRoles,
    });
    return res;
  }

  async search(search: string, user?: RequestUser) {
    if (search.length < 3) {
      return []
    }

    if (!user) {
      const res = await this.userRepository.find({
        select: ['id', 'username', 'expirience', 'info'],
        where: {
          username: Like(`%${search}%`)
        }
      });
      return res;
    }

    const res = await this.userRepository
      .createQueryBuilder("user")
      .select([
        `CASE WHEN "userFriendRequest"."creatorId" = '${user.id}' OR "userFriendRequest"."receiverId" = '${user.id}'
        THEN "userFriendRequest"."approved"
        ELSE NULL
        END AS approved`,
        `CASE WHEN "userFriendRequest"."creatorId" = '${user.id}' OR "userFriendRequest"."receiverId" = '${user.id}'
        THEN 1
        ELSE 0
        END AS "hasRelation"`,
        'user.id || role.name AS "roleAndId"',
        'role.name AS "roleName"',
        `"userFriendRequest"."creatorId" AS "creatorId"`,
        '"userFriendRequest"."receiverId" AS "receiverId"',
        '"userFriendRequest"."id" AS "requestId"',
        "user.id AS id",
        "user.username AS username",
        "user.expirience AS expirience",
        "user.avatar AS avatar",
      ])
      .distinctOn(['"roleAndId"'])
      .leftJoin("user_friend_request", "userFriendRequest", '"userFriendRequest"."creatorId" = user.id OR "userFriendRequest"."receiverId" = user.id')
      .leftJoin("user_roles_role", "userRole", '"userRole"."userId" = user.id')
      .leftJoin("role", "role", '"userRole"."roleId" = role.id')
      .orderBy('"roleAndId"', "ASC")
      .addOrderBy(`"hasRelation"`, "DESC")
      .where(`user.id != :id AND user.username ILIKE '%${search}%'`, { id: user.id })
      .getRawMany()

    return this.normalizeUserRoles(res)
  }

  
  async sendFriendRequest(user: RequestUser, friendId: string) {
    if (user.id === friendId) {
      throw new HttpException("Нельзя добавить себя в друзья", HttpStatus.BAD_REQUEST)
    }

    const creator = await this.userRepository.findOne({
      where: {id: user.id}
    })

    const receiver = await this.userRepository.findOne({
      where: {id: friendId}
    })

    if (!creator || !receiver) {
      throw new HttpException("Пользователя на существует", HttpStatus.NOT_FOUND)
    }

    const hasRequest = await this.hasRequest(creator, receiver)

    if (hasRequest) {
      throw new HttpException("Заявка уже существует", HttpStatus.BAD_REQUEST)
    }

    const friendRequestEntity = await this.userFriendRequestRepository.create({
      creator,
      receiver,
      approved: false
    })
    await this.userFriendRequestRepository.save(friendRequestEntity)

    return friendRequestEntity;
  }

  async hasRequest(
    creator: User,
    receiver: User
  ) {
    const candidate = await this.userFriendRequestRepository.findOne({
      where: [
        {creator, receiver},
        {creator: receiver, receiver: creator}
      ]
    })

    return !!candidate
  }

  async approveFriendRequest(user: RequestUser, requestId: string) {
    const friendRequest = await this.userFriendRequestRepository.findOne({
      where: {id: requestId},
      relations: {
        receiver: true
      }
    })

    if (!friendRequest) {
      throw new HttpException("Заявки не найдено", HttpStatus.BAD_REQUEST)
    }

    if (user.id !== friendRequest.receiver.id) {
      throw new HttpException("Вы не являетесь получателем заявки", HttpStatus.BAD_REQUEST)
    }

    friendRequest.approved = true

    await this.userFriendRequestRepository.save(friendRequest)

    return friendRequest
  }

  async getFriends(user: RequestUser) {
    const res = await this.userFriendRequestRepository
      .createQueryBuilder("userFriendRequest")
      .select([
                `user.id AS id`, 
                "user.username AS username",
                "user.expirience AS expirience",
                "user.avatar AS avatar",
                '"userFriendRequest"."creatorId" AS "creatorId"',
                '"userFriendRequest"."receiverId" AS "receiverId"',
                '"userFriendRequest".approved AS approved',
                '"userFriendRequest"."id" AS "requestId"',
                'role.name AS "roleName"',
              ])
      .innerJoin("user", "user", "user.id = userFriendRequest.creatorId OR user.id = userFriendRequest.receiverId")
      .leftJoin("user_roles_role", "userRole", '"userRole"."userId" = user.id')
      .leftJoin("role", "role", '"userRole"."roleId" = role.id')
      .where("user.id != :id AND userFriendRequest.approved = true AND (userFriendRequest.creatorId = :id OR userFriendRequest.receiverId = :id)", { id: user.id })
      .getRawMany()

    return this.normalizeUserRoles(res)
  }

  async normalizeUserRoles(users: any[]) {
    const normalizedUsers: any[] = []
    const userIds: string[] = []

    users.forEach(user => {
      const {roleAndId, roleName, ...newUser} = user
      if (!userIds.includes(user.id)) {
        normalizedUsers.push({
          ...newUser,
          roles: [{name: roleName}]
        })
        userIds.push(user.id)
        return
      }
      normalizedUsers.find(us => us.id === user.id).roles.push({name: roleName})
    })

    return normalizedUsers
  }

  async getFriendRequests(user: RequestUser, outbox: boolean) {
    const res = await this.userFriendRequestRepository
      .createQueryBuilder("userFriendRequest")
      .select([
                `user.id AS id`, 
                "user.username AS username",
                "user.expirience AS expirience",
                "user.avatar AS avatar",
                '"userFriendRequest"."creatorId" AS "creatorId"',
                '"userFriendRequest"."receiverId" AS "receiverId"',
                '"userFriendRequest".approved AS approved',
                '"userFriendRequest"."id" AS "requestId"',
                'role.name AS "roleName"',
              ])
      .innerJoin("user", "user", "user.id = userFriendRequest.creatorId OR user.id = userFriendRequest.receiverId")
      .leftJoin("user_roles_role", "userRole", '"userRole"."userId" = user.id')
      .leftJoin("role", "role", '"userRole"."roleId" = role.id')
      .where(`userFriendRequest.${outbox ? "creatorId" : "receiverId"} = :id AND userFriendRequest.approved = false AND user.id != :id`, { id: user.id })
      .getRawMany()

    return this.normalizeUserRoles(res)
  }

  async findByRating() {
    const res = await this.userRepository.find({
      select: ['id', 'username', 'expirience', 'info'],
      order: {
        expirience: "DESC"
      }
    })
    return res
  }

  async findOne(id: string, options?: { isLite?: boolean }) {
    const res = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'expirience', 'info'],
      relations: {
        roles: !options?.isLite,
      },
    });
    return res;
  }

  async findByLogin(login: string) {
    const res = await this.userRepository.findOne({
      where: { login },
      relations: {
        roles: true,
      },
    });
    return res;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const res = await this.userRepository.delete(id);
    return res.affected;
  }

  async uploadAvatar(file: Express.Multer.File, reqUser: RequestUser) {
    const uploadedFile = await this.filesService.uploadFile(file);
    await this.userRepository
      .createQueryBuilder()
      .update()
      .where({ id: reqUser.id })
      .set({
        avatar: uploadedFile,
      })
      .execute();
    return await this.findOne(reqUser.id);
  }

  async earnExp(id: string, expirience: number) {
    const user = await this.findOne(id);

    if (!user) return;

    await this.update(id, {
      expirience: (user?.expirience ? user.expirience : 0) + expirience,
    });
  }
}
