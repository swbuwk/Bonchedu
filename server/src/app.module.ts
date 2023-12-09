import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course/entities/course.entity';
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './lesson/entities/lesson.entity';
import { TaskModule } from './task/task.module';
import { Answer, Task } from './task/entities/task.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { ChapterModule } from './chapter/chapter.module';
import { Chapter } from './chapter/entities/chapter.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesModule } from './files/files.module';
import {
  UserChapter,
  UserCourse,
  UserLesson,
} from './user/entities/user-relation.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [
        UserCourse,
        UserChapter,
        UserLesson,
        Role,
        Course,
        Lesson,
        Task,
        Chapter,
        User,
        Answer
      ],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    CourseModule,
    LessonModule,
    TaskModule,
    UserModule,
    AuthModule,
    RoleModule,
    ChapterModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
