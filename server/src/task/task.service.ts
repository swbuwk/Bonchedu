import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer, Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { AddAnswerDto } from './dto/add-answer.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepository.create(createTaskDto);
    await this.taskRepository.save(task);
    return task;
  }

  async updateAnswer(id: string, answer: AddAnswerDto) {
    await this.answerRepository.update(id, answer);
    return await this.answerRepository.find({
      where: { id },
    });
  }

  async addAnswer(answer: AddAnswerDto) {
    const answerEntity = await this.answerRepository.create(answer);
    await this.answerRepository.save(answerEntity);

    const task = await this.findOne(answer.taskId);
    if (!task?.rightAnswerId) {
      await this.selectRightAnswer(answer.taskId, answerEntity.id);
    }

    return answerEntity;
  }

  async deleteAnswer(id: string) {
    const deletedAnswer = await this.answerRepository.findOne({
      where: { id },
    });
    await this.answerRepository.delete(id);
    return deletedAnswer;
  }

  async selectRightAnswer(id: string, answerId: string) {
    await this.taskRepository.update(id, {
      rightAnswerId: answerId,
    });

    return await this.findOne(id);
  }

  async findLessonTasks(id: string) {
    const res = await this.taskRepository.find({
      where: {
        lessonId: id,
      },
      relations: {
        answers: true,
      },
      order: {
        created_at: 'ASC',
        answers: {
          created_at: 'ASC',
        },
      },
    });

    return res;
  }

  async findOne(id: string) {
    const res = await this.taskRepository.findOne({
      where: { id },
      relations: {
        answers: true,
      },
    });
    return res;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const res = await this.taskRepository.delete(id);
    return res.affected;
  }
}
