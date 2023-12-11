import { Chapter } from 'src/chapter/entities/chapter.entity';
import { Task } from 'src/task/entities/task.entity';
import { UserLesson } from 'src/user/entities/user-relation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  difficulty: number;

  @Column()
  expirience: number;

  @Column()
  authorId: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chapterId' })
  chapter: Chapter;

  @Column()
  position: number;

  @Column()
  chapterId: string;

  @Column()
  courseId: string;

  @OneToMany(() => UserLesson, (userLesson) => userLesson.user, {
    onDelete: 'CASCADE',
  })
  userLessons: UserLesson[];

  @OneToMany(() => Task, (task) => task.lesson)
  tasks: Task[];
}

export interface LessonExtended extends Lesson {
  completed: boolean;
}
