import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { FilesService } from 'src/files/files.service';
import { RequestUser } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    const newRole = await this.roleService.findByName('USER');
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

  async findAll() {
    const res = await this.userRepository.find({
      select: ['id', 'username', 'expirience', 'info'],
    });
    return res;
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
