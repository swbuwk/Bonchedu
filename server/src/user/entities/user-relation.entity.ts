import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { Course } from 'src/course/entities/course.entity';

@Entity('user_course')
export class UserCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: 0 })
  chapterProgress: number;

  @ManyToOne(() => User, (user) => user.userCourses, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Course, (course) => course.userCourses, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'courseId' })
  course: Course;

  @Column()
  courseId: string;
}

@Entity('user_chapter')
export class UserChapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  progress: number;

  @ManyToOne(() => User, (user) => user.userChapters, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.userChapters, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'chapterId' })
  chapter: Chapter;

  @Column()
  chapterId: string;
}

@Entity('user_lesson')
export class UserLesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.userLessons, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.userLessons, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'chapterId' })
  lesson: Lesson;

  @Column()
  lessonId: string;
}
