import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor (
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
      ) {}

    async create(createRoleDto: CreateRoleDto) {
        const res = await this.roleRepository.insert(createRoleDto)
        return res.identifiers[0]
    }

    async findAll() {
        const res = await this.roleRepository.find()
        return res
    }

    async findByName(name: string) {
        const res = await this.roleRepository.findOne({
            where: {name}
        })
        return res
    }
}
