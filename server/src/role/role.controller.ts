import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiTags('Role')
  @ApiOperation({ summary: 'Создать роль'})
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiTags('Role')
  @ApiOperation({ summary: 'Получить все роли'})
  @Get()
  findAll() {
    return this.roleService.findAll()
  }

  @ApiTags('Role')
  @ApiOperation({ summary: 'Получить роль по имени'})
  @Get(":name")
  findByName(@Param('name') name: string) {
    return this.roleService.findByName(name)
  }

}
