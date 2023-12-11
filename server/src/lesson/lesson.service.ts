import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson, LessonExtended } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { ChapterService } from 'src/chapter/chapter.service';
import { RequestUser } from 'src/types';
import { UserLesson } from 'src/user/entities/user-relation.entity';
import { ChapterExtended } from 'src/chapter/entities/chapter.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LessonService {
  constructor(
    @Inject(ChapterService)
    private chapterService: ChapterService,
    @Inject(UserService)
    private userService: UserService,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(UserLesson)
    private userLessonRepository: Repository<UserLesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const chapter = await this.chapterService.findOne(
      createLessonDto.chapterId,
    );

    if (!chapter) {
      throw new HttpException('Глава не найдена', HttpStatus.NOT_FOUND);
    }

    const lessonEntity = this.lessonRepository.create({
      ...createLessonDto,
      authorId: chapter.authorId,
      position: chapter?.lessonsCount + 1,
    });
    const lesson = await this.lessonRepository.save(lessonEntity);
    await this.chapterService.changeLessonsCount(lesson.chapterId, 1);
    return lesson;
  }

  async getChapterLessons(chapterId: string, user: RequestUser) {
    if (!chapterId) {
      throw new HttpException('Укажите главу', HttpStatus.BAD_REQUEST);
    }

    const lessons = await this.lessonRepository.manager.connection
      .createQueryBuilder()
      .select("lessons.*")
      .from(
        qb => (
          qb.select([
            `CASE WHEN "userLessons"."userId" = '${user.id}' THEN "userLessons".completed
              ELSE false
              END AS completed`,
            `CASE WHEN "userLessons"."userId" = '${user.id}' THEN 1
              ELSE 0
              END AS "isRequestedUser"`,
            'lesson.id AS id',
            'lesson.name AS name',
            'lesson.difficulty AS difficulty',
            'lesson.expirience AS expirience',
            'lesson.position AS position',
            'lesson.courseId AS "courseId"',
            'lesson."chapterId" AS "chapterId"',
            'lesson."authorId" AS "authorId"',
          ])
          .distinctOn(["id"])
          .from("lesson", "lesson")
          .leftJoin(
            'user_lesson',
            'userLessons',
            'userLessons.lessonId = lesson.id',
          )
          .where('lesson.chapterId = :chapterId', { chapterId })
          .orderBy("id", "ASC")
          .addOrderBy(`"isRequestedUser"`, "DESC")
        ), "lessons"
      )
      .orderBy("lessons.position")
      .getRawMany()

    return lessons as Lesson[];
  }

  async findOne(
    id: string,
    user?: RequestUser,
  ): Promise<LessonExtended | Lesson | null> {
    if (!user) {
      const res = await this.lessonRepository.findOne({
        where: { id },
      });
      return res;
    } else {
        const lesson = await this.lessonRepository
        .createQueryBuilder('lesson')
        .select([
          `CASE WHEN "userLessons"."userId" = '${user.id}' THEN "userLessons".completed
            ELSE false
            END AS completed`,
          `CASE WHEN "userLessons"."userId" = '${user.id}' THEN 1
            ELSE 0
            END AS "isRequestedUser"`,
          'lesson.id AS id',
          'lesson.name AS name',
          'lesson.difficulty AS difficulty',
          'lesson.expirience AS expirience',
          'lesson.position AS position',
          'lesson.courseId AS "courseId"',
          'lesson."chapterId" AS "chapterId"',
          'lesson."authorId" AS "authorId"',
        ])
        .distinctOn(["id"])
        .leftJoin(
          'user_lesson',
          'userLessons',
          'userLessons.lessonId = lesson.id',
        )
        .where('lesson.id = :id', { id })
        .orderBy("id", "ASC")
        .addOrderBy(`"isRequestedUser"`, "DESC")
        .getRawOne();

      return lesson as LessonExtended;
    }
  }

  async startLesson(id: string, user: RequestUser) {
    const lesson = (await this.findOne(id, user)) as LessonExtended | null;

    if (!lesson) {
      throw new HttpException('Занятие не найдено', HttpStatus.NOT_FOUND);
    }

    const chapter = (await this.chapterService.findOne(
      lesson.chapterId,
      user,
    )) as ChapterExtended | null;

    const progress = chapter?.progress ?? 0;

    if (progress + 1 < lesson.position) {
      throw new HttpException(
        'Пройдите предыдущие занятия',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (lesson?.completed) {
      return await this.findOne(id, user)
      // throw new HttpException('Занятие уже пройдено', HttpStatus.BAD_REQUEST);
    }

    const userChapter = await this.chapterService.findUserChapter(lesson.chapterId, user)
    if (!userChapter) {
      this.chapterService.startChapter(lesson.chapterId, user)
    }

    const userLesson = await this.userLessonRepository.findOne({
      where: {
        userId: user.id,
        lessonId: id,
      },
    });

    if (!userLesson) {
      await this.userLessonRepository.insert({
        lessonId: id,
        userId: user.id,
        completed: false,
      });
    }


    return await this.findOne(id, user)
  }

  async completeLesson(id: string, user: RequestUser) {
    const lesson = await this.findOne(id, user)

    const userLesson = await this.userLessonRepository.findOne({
      where: {
        userId: user.id,
        lessonId: id,
      },
    });

    if (!lesson) {
      throw new HttpException('Занятие не найдено', HttpStatus.NOT_FOUND);
    }

    if (!userLesson?.id) {
      throw new HttpException('Занятие не начато или его не существует', HttpStatus.BAD_REQUEST);
    }

    await this.userService.earnExp(user.id, lesson.expirience);

    if (userLesson?.completed) {
      return await this.findOne(id, user)
      // throw new HttpException('Занятие уже пройдено', HttpStatus.BAD_REQUEST);
    }
    
    await this.userLessonRepository.update(userLesson?.id, {
      completed: true
    })

    await this.chapterService.changeProgress(lesson.chapterId, user, 1)

    return await this.findOne(id, user)
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    await this.lessonRepository.update(id, updateLessonDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const lesson = await this.findOne(id);

    if (!lesson) {
      throw new HttpException('Занятия не существует', HttpStatus.NOT_FOUND);
    }

    await this.lessonRepository.delete(id);
    await this.chapterService.changeLessonsCount(lesson.chapterId, -1);
    return lesson;
  }
}
