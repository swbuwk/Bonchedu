import { Chapter } from 'src/chapter/entities/chapter.entity';
import { UserCourse } from 'src/user/entities/user-relation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Chapter, (chapter) => chapter.course, {
    onDelete: 'CASCADE',
  })
  chapters: Chapter[];

  @OneToMany(() => UserCourse, (userCourse) => userCourse.user, {
    onDelete: 'CASCADE',
  })
  userCourses: UserCourse[];

  @Column()
  authorId: string;

  @Column({ nullable: true })
  coverImage: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @Column({ default: 0 })
  lessonsCount: number;

  @Column({ default: 0 })
  chaptersCount: number;
}
