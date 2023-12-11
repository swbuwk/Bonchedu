import { Lesson } from "src/lesson/entities/lesson.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string

    // @Column()
    // type: string

    @Column()
    authorId: string

    @ManyToOne(() => Lesson, (lesson) => lesson.tasks, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "lessonId"})
    lesson: Lesson

    @Column()
    lessonId: string

    @Column()
    question: string

    @OneToMany(() => Answer, (answer) => answer.task)
    answers: Answer[]

    @Column({ nullable: true })
    rightAnswerId: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}

@Entity()
export class Answer {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    text: string

    @ManyToOne(() => Task, (task) => task.answers, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "taskId"})
    task: Task

    @Column()
    taskId: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}