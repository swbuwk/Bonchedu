import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RequestWithUser } from 'src/types';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiTags('Lesson')
  @ApiOperation({ summary: 'Создать занятие' })
  @ApiBearerAuth()
  @Roles(['TEACHER', 'ADMIN'])
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @ApiTags('Lesson')
  @ApiOperation({ summary: 'Получить занятия главы' })
  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('chapterId') chapterId: string,
    @Request() req: RequestWithUser,
  ) {
    return this.lessonService.getChapterLessons(chapterId, req.user);
  }

  @ApiTags('Lesson')
  @ApiOperation({ summary: 'Получить занятие по айди' })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @ApiTags('Lesson')
  @ApiOperation({ summary: 'Обновить занятие' })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @ApiTags('Lesson')
  @ApiOperation({ summary: 'Начать занятие' })
  @UseGuards(AuthGuard)
  @Post(':id/start')
  start(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.lessonService.startLesson(id, req.user);
  }

  @ApiTags('Lesson')
  @ApiOperation({ summary: 'Выполнить занятие' })
  @UseGuards(AuthGuard)
  @Post(':id/complete')
  complete(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.lessonService.completeLesson(id, req.user);
  }

  @ApiTags('Lesson')
  @ApiOperation({ summary: 'Удалить занятие' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
