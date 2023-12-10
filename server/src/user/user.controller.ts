import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile, Request, Query } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Поиск пользователей'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  search(@Query("search") search: string, @Req() req: RequestWithUser) {
    return this.userService.search(search, req.user);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Получить рейтинг пользователей'})
  @Get("rating")
  findByRating() {
    return this.userService.findByRating();
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Получить информацию о своем аккаунте'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('account')
  getMyAccount(@Req() req: RequestWithUser) {
    return this.userService.findOne(req.user.id);
  }
  
  @ApiTags('User')
  @ApiOperation({ summary: 'Получить друзей'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("friend")
  getFriends(@Req() req: RequestWithUser) {
    return this.userService.getFriends(req.user);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Получить заявки в друзья'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("friend/requests")
  getFriendRequests(@Req() req: RequestWithUser, @Query("type") type: string) {
    return this.userService.getFriendRequests(req.user, type === "outbox");
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Получить пользователя по айди'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


  @ApiTags('User')
  @ApiOperation({ summary: 'Отправить запрос на дружбу'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("friend/send-request/:id")
  sendFriendRequest(@Req() req: RequestWithUser, @Param("id") friendId: string) {
    return this.userService.sendFriendRequest(req.user, friendId);
  }

  @ApiTags('User')
  @ApiOperation({ summary: 'Принять запрос дружбы'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("friend/approve-request/:id")
  approveFriendRequest(@Req() req: RequestWithUser, @Param("id") requestId: string) {
    return this.userService.approveFriendRequest(req.user, requestId);
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
  @Post("upload-avatar")
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
