import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddAnswerDto } from './dto/add-answer.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiTags('Task')
  @ApiOperation({ summary: 'Создать упражнение'})
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiTags('Task')
  @ApiOperation({ summary: 'Добавить ответ'})
  @Post('answer')
  addAnswer(@Body() addAnswerDto: AddAnswerDto) {
    return this.taskService.addAnswer(addAnswerDto);
  }

  @ApiTags('Task')
  @ApiOperation({ summary: 'Установить верный ответ'})
  @Post(':id/answer/:answerId/set')
  selectRightAnswer(@Param('id') id: string, @Param('answerId') answerId: string) {
    return this.taskService.selectRightAnswer(id, answerId);
  }


  @ApiTags('Task')
  @ApiOperation({ summary: 'Получить все упражнения занятия'})
  @Get()
  findAll(@Query("lessonId") lessonId: string) {
    return this.taskService.findLessonTasks(lessonId);
  }

  @ApiTags('Task')
  @ApiOperation({ summary: 'Получить одно упражнение'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiTags('Task')
  @ApiOperation({ summary: 'Обновить упражнение'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiTags('Task')
  @ApiOperation({ summary: 'Обновить упражнение'})
  @Patch('answer/:id')
  updateAnswer(@Param('id') id: string, @Body() updateTaskDto: AddAnswerDto) {
    return this.taskService.updateAnswer(id, updateTaskDto);
  }

  @ApiTags('Task')
  @ApiOperation({ summary: 'Удалить ответ'})
  @Delete('answer/:id')
  deleteAnswer(@Param('id') id: string) {
    return this.taskService.deleteAnswer(id);
  }

  @ApiTags('Task')
  @ApiOperation({ summary: 'Удалить упражнение'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
