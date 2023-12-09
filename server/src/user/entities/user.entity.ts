import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserChapter, UserCourse, UserLesson } from './user-relation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  expirience?: number;

  @Column({ default: '' })
  info: string;

  @OneToMany(() => UserCourse, (userCourse) => userCourse.user, {
    onDelete: 'CASCADE',
  })
  userCourses: UserCourse[];

  @OneToMany(() => UserChapter, (userChapter) => userChapter.user, {
    onDelete: 'CASCADE',
  })
  userChapters: UserChapter[];

  @OneToMany(() => UserLesson, (userLesson) => userLesson.user, {
    onDelete: 'CASCADE',
  })
  userLessons: UserLesson[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @Column({ nullable: true })
  avatar: string;
}
