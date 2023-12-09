import { Module, forwardRef } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { LessonModule } from 'src/lesson/lesson.module';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService],
  imports: [
    TypeOrmModule.forFeature([Chapter]),
    forwardRef(() => CourseModule),
    forwardRef(() => LessonModule),
    UserModule,
  ],
  exports: [TypeOrmModule, ChapterService],
})
export class ChapterModule {}
