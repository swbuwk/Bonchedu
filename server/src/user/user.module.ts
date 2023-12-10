import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { FilesModule } from 'src/files/files.module';
import {
  UserChapter,
  UserCourse,
  UserFriendRequest,
  UserLesson,
} from './entities/user-relation.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    RoleModule,
    FilesModule,
    TypeOrmModule.forFeature([User, UserCourse, UserChapter, UserLesson, UserFriendRequest]),
  ],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
