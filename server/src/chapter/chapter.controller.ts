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
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestWithUser } from 'src/types';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @ApiTags('Chapter')
  @ApiOperation({ summary: 'Создать главу курса' })
  @ApiBearerAuth()
  @Roles(['TEACHER', 'ADMIN'])
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @ApiTags('Chapter')
  @ApiOperation({ summary: 'Получить главы курса' })
  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('courseId') courseId: string,
    @Request() req: RequestWithUser,
  ) {
    return this.chapterService.getCourseChapters(courseId, req.user);
  }

  @ApiTags('Chapter')
  @ApiOperation({ summary: 'Получить информацию о главе' })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.chapterService.findOne(id, req.user);
  }

  @ApiTags('Chapter')
  @ApiOperation({ summary: 'Изменить информацию о главе' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chapterService.update(id, updateChapterDto);
  }

  @ApiTags('Chapter')
  @ApiOperation({ summary: 'Удалить главу' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterService.remove(id);
  }
}
