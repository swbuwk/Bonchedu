import { Course } from 'src/course/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { UserChapter } from 'src/user/entities/user-relation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Lesson, (lesson) => lesson.chapter, { onDelete: 'CASCADE' })
  lessons: Lesson[];

  @ManyToOne(() => Course, (course) => course.chapters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @OneToMany(() => UserChapter, (userChapter) => userChapter.user, {
    onDelete: 'CASCADE',
  })
  userChapters: UserChapter[];

  @Column({ default: 0 })
  position: number;

  @Column()
  courseId: string;

  @Column({ default: 0 })
  lessonsCount: number;
}

export interface ChapterExtended extends Chapter {
  progress: number;
}
