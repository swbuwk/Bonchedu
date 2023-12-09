import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/types';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFileSchema } from 'src/swagger/schemas';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('User')
  @ApiOperation({ summary: 'Добавить роль пользователю'})
  @Post(':id/role')
  addRole(@Param('id') id: string, @Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(id, addRoleDto);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Получить всех пользователей'})
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Получить информацию о своем аккаунте'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/account')
  getMyAccount(@Req() req: RequestWithUser) {
    return this.userService.findOne(req.user.id);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Получить пользователя по айди'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Обновить пользователя'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Загрузить аватар'})
  @ApiConsumes('multipart/form-data')
  @ApiBody(uploadFileSchema)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post("uploadAvatar")
  uploadAvatar(@UploadedFile('file') file: Express.Multer.File, @Request() req: RequestWithUser) {
    return this.userService.uploadAvatar(file, req.user);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Удалить пользователя'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
