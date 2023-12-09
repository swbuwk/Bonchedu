import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter, ChapterExtended } from './entities/chapter.entity';
import { Repository } from 'typeorm';
import { RequestUser } from 'src/types';
import { CourseService } from 'src/course/course.service';
import { UserChapter } from 'src/user/entities/user-relation.entity';

@Injectable()
export class ChapterService {
  constructor(
    @Inject(CourseService)
    private courseService: CourseService,
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    @InjectRepository(UserChapter)
    private userChapterRepository: Repository<UserChapter>,
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    const course = await this.courseService.findOne(createChapterDto.courseId);

    if (!course) {
      throw new HttpException('Курса не существует', HttpStatus.BAD_REQUEST);
    }

    const chapterEntity = this.chapterRepository.create({
      ...createChapterDto,
      position: course?.chaptersCount + 1,
    });
    const chapter = await this.chapterRepository.save(chapterEntity);
    await this.courseService.changeChaptersCount(createChapterDto.courseId, 1);
    return chapter;
  }

  async getCourseChapters(courseId: string, user: RequestUser) {
    if (!courseId) {
      throw new HttpException('Укажите курс', HttpStatus.BAD_REQUEST);
    }

    const chapters = await this.chapterRepository.manager.connection
      .createQueryBuilder()
      .select("chapters.*")
      .from(
        subQuery => {
          return subQuery.select([
            `CASE WHEN "userChapter"."userId" = '${user.id}' THEN "userChapter".progress
              ELSE 0
              END AS progress`,
            `CASE WHEN "userChapter"."userId" = '${user.id}' THEN 1
              ELSE 0
              END AS "isRequestedUser"`,
            'chapter.id AS id',
            'chapter.name AS name',
            'chapter.description AS description',
            'chapter.position AS position',
            'chapter."lessonsCount" AS "lessonsCount"',
            'chapter.courseId AS "courseId"',
          ])
          .from("chapter", "chapter")
          .distinctOn(["id"])
          .leftJoin(
            'user_chapter',
            'userChapter',
            'userChapter.chapterId = chapter.id',
          )
          .where('chapter.courseId = :courseId', { courseId })
          .orderBy("id", "ASC")
          .addOrderBy(`"isRequestedUser"`, "DESC")
        }
      , "chapters")
      .orderBy("chapters.position")
      .getRawMany()

    return chapters as Chapter[];
  }

  async findOne(
    id: string,
    user?: RequestUser,
  ): Promise<ChapterExtended | Chapter | null> {
    if (!user) {
      const chapter = await this.chapterRepository.findOne({
        where: { id },
      });

      return chapter;
    } else {
        const chapter = await this.chapterRepository
        .createQueryBuilder('chapter')
        .select([
          `CASE WHEN "userChapter"."userId" = '${user.id}' THEN "userChapter".progress
            ELSE 0
            END AS progress`,
          `CASE WHEN "userChapter"."userId" = '${user.id}' THEN 1
            ELSE 0
            END AS "isRequestedUser"`,
          'chapter.id AS id',
          'chapter.name AS name',
          'chapter.description AS description',
          'chapter.position AS position',
          'chapter."lessonsCount" AS "lessonsCount"',
          'chapter.courseId AS "courseId"',
        ])
        .distinctOn(["id"])
        .leftJoin(
          'user_chapter',
          'userChapter',
          'userChapter.chapterId = chapter.id',
        )
        .where('chapter.id = :id', { id })
        .orderBy("id", "ASC")
        .addOrderBy(`"isRequestedUser"`, "DESC")
        .getRawOne();

      return chapter as Chapter;
    }
  }

  async findUserChapter(chapterId: string, user: RequestUser) {
    const userChapter = await this.userChapterRepository.findOne({
      where: {
        chapterId,
        userId: user.id
      }
    })

    return userChapter
  }

  async startChapter(id: string, user: RequestUser) {
    const chapter = await this.findOne(id)

    if (!chapter) {
      throw new HttpException('Глава не найдена', HttpStatus.NOT_FOUND);
    }

    const userChapter = await this.userChapterRepository.insert({
      chapterId: id,
      userId: user.id,
      progress: 0,
    });

    const userCourse = await this.courseService.findUserCourse(chapter.courseId, user)
    if (!userCourse) {
      await this.courseService.startCourse(chapter?.courseId, user)
    }

    return await this.userChapterRepository.find({
      where: { id: userChapter.identifiers[0].id },
    });
  }

  async update(id: string, updateChapterDto: UpdateChapterDto) {
    await this.chapterRepository.update(id, updateChapterDto);
    return this.findOne(id);
  }

  async changeLessonsCount(id: string, delta: number) {
    const chapter = await this.findOne(id);

    if (!chapter || !chapter.courseId) {
      throw new HttpException('Глава не найдена', HttpStatus.NOT_FOUND);
    }

    const newChapter: Chapter = {
      ...chapter,
      lessonsCount: chapter.lessonsCount + delta,
    };

    await this.update(id, newChapter);
    await this.courseService.changeLessonsCount(chapter.courseId, delta);

    return newChapter;
  }

  async changeProgress(id: string, user: RequestUser, delta: number) {
    // if (!user) {
      // const a = this.userChapterRepository.createQueryBuilder('userChapter')
      //   .update("WHERE userChapter.chapterId = :id", { id })
      //   .set("userChapter.progress ")
      //   .getQuery()

      //   console.log(a)
    // }

    const userChapter = await this.findUserChapter(id, user)
    const chapter = await this.findOne(id)

    if (!userChapter) {
      throw new HttpException('Глава не найдена', HttpStatus.NOT_FOUND);
    }

    if (!chapter) {
      throw new HttpException('Глава не найденаа', HttpStatus.NOT_FOUND);
    }

    await this.userChapterRepository.update(userChapter.id, {
      progress: userChapter.progress + delta
    })
    await this.courseService.changeProgress(chapter.courseId, user, 1)
  }

  async remove(id: string) {
    const chapter = await this.findOne(id);

    if (!chapter) {
      throw new HttpException('Главы не существует', HttpStatus.NOT_FOUND);
    }

    await this.chapterRepository.delete(id);
    await this.courseService.changeChaptersCount(chapter.courseId, -1);
    await this.courseService.changeLessonsCount(
      chapter.courseId,
      -chapter.lessonsCount,
    );
    return chapter;
  }
}
