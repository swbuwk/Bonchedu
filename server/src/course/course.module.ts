import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterModule } from 'src/chapter/chapter.module';
import { FilesModule } from 'src/files/files.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([Course]),
    UserModule,
    forwardRef(() => ChapterModule),
    FilesModule,
  ],
  exports: [TypeOrmModule, CourseService],
})
export class CourseModule {}
