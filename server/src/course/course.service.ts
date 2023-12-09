import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestUser } from 'src/types';
import { FilesService } from 'src/files/files.service';
import { UserCourse } from 'src/user/entities/user-relation.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(UserCourse)
    private userCourseRepository: Repository<UserCourse>,
    private filesService: FilesService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    user: RequestUser,
    file?: Express.Multer.File,
  ) {
    const res = await this.courseRepository.insert({
      ...createCourseDto,
      authorId: user.id,
    });

    if (file) {
      const resCover = await this.uploadCover(
        res.identifiers[0].id,
        file,
        user,
      );
      return resCover;
    }

    return await this.findOne(res.identifiers[0].id);
  }

  async findAll(user: RequestUser) {
    const res = await this.courseRepository
      .createQueryBuilder('course')
      .select([
        `CASE WHEN "userCourse"."userId" = '${user.id}' THEN "userCourse".progress
          ELSE 0
          END AS progress`,
        `CASE WHEN "userCourse"."userId" = '${user.id}' THEN 1
          ELSE 0
          END AS "isRequestedUser"`,
        'course.id AS id',
        'course.name AS name',
        'course.description AS description',
        'course."lessonsCount" AS "lessonsCount"',
        'course."chaptersCount" AS "chaptersCount"',
        'course.authorId AS "authorId"',
        'course.coverImage AS "coverImage"',
        'course.created_at AS created_at',
      ])
      .distinctOn(["id"])
      .leftJoin('user_course', 'userCourse', 'userCourse.courseId = course.id')
      .orderBy("id", "ASC")
      .addOrderBy(`"isRequestedUser"`, "DESC")
      .getRawMany();

    return res;
  }

  async findOne(id: string, user?: RequestUser) {
    if (!user) {
      const res = await this.courseRepository.findOne({
        where: { id },
      });
      return res;
    } else {
      const res = await this.courseRepository
        .createQueryBuilder('course')
        .select([
          `CASE WHEN "userCourse"."userId" = '${user.id}' THEN "userCourse".progress
            ELSE 0
            END AS progress`,
          'course.id AS id',
          'course.name AS name',
          'course.description AS description',
          'course."lessonsCount" AS "lessonsCount"',
          'course."chaptersCount" AS "chaptersCount"',
          'course.authorId AS "authorId"',
          'course.coverImage AS "coverImage"',
          'course.created_at AS created_at',
        ])
        .distinctOn(["id"])
        .leftJoin(
          'user_course',
          'userCourse',
          'userCourse.courseId = course.id',
        )
        .where('course.id = :id', { id })
        .getRawOne();

      return res as Course;
    }
  }

  async startCourse(id: string, user: RequestUser) {
    const userCourse = await this.userCourseRepository.insert({
      courseId: id,
      userId: user.id,
      progress: 0,
    });

    return await this.userCourseRepository.find({
      where: { id: userCourse.identifiers[0].id },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.courseRepository.update(id, updateCourseDto);
    return await this.findOne(id);
  }

  async uploadCover(
    id: string,
    file: Express.Multer.File,
    reqUser: RequestUser,
  ) {
    const course = await this.findOne(id);

    if (course?.authorId !== reqUser.id) {
      throw new HttpException(
        'Вы не являетесь автором курса',
        HttpStatus.FORBIDDEN,
      );
    }
    const uploadedFile = await this.filesService.uploadFile(file);

    await this.courseRepository
      .createQueryBuilder()
      .update()
      .where({ id: course.id })
      .set({
        coverImage: uploadedFile,
      })
      .execute();
    return await this.findOne(id);
  }

  async findUserCourse(courseId: string, user: RequestUser) {
    const userCourse = await this.userCourseRepository.findOne({
      where: {
        courseId,
        userId: user.id
      }
    })

    return userCourse
  }

  async changeChaptersCount(id: string, delta: number) {
    const course = await this.findOne(id);

    if (!course) {
      throw new HttpException('Курс не найден', HttpStatus.NOT_FOUND);
    }

    const newCourse: Course = {
      ...course,
      chaptersCount: course.chaptersCount + delta,
    };

    await this.update(id, newCourse);

    return newCourse;
  }

  async changeLessonsCount(id: string, delta: number) {
    const course = await this.findOne(id);

    if (!course) {
      throw new HttpException('Курс не найден', HttpStatus.NOT_FOUND);
    }

    const newCourse: Course = {
      ...course,
      lessonsCount: course.lessonsCount + delta,
    };

    await this.update(id, newCourse);

    return newCourse;
  }

  async changeProgress(id: string, user: RequestUser, delta: number) {
    const userCourse = await this.findUserCourse(id, user)
    
    if (!userCourse) {
      throw new HttpException('Курс не найден', HttpStatus.NOT_FOUND);
    }

    await this.userCourseRepository.update(userCourse.id, {
      progress: userCourse.progress + delta
    })  }

  async remove(id: string) {
    const res = await this.courseRepository.delete({ id });
    return res.affected;
  }
}
