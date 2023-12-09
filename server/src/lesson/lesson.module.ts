import { Module, forwardRef } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { ChapterModule } from 'src/chapter/chapter.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    forwardRef(() => ChapterModule),
    UserModule,
  ],
  exports: [TypeOrmModule, LessonService],
})
export class LessonModule {}
