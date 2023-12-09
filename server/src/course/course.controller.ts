import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  Req,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/role.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequestWithUser } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { addCourseSchema, uploadFileSchema } from 'src/swagger/schemas';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiTags('Course')
  @ApiOperation({ summary: 'Создать курс' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(addCourseSchema)
  @Roles(['TEACHER', 'ADMIN'])
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.courseService.create(createCourseDto, req.user, file);
  }

  @ApiTags('Course')
  @ApiOperation({ summary: 'Получить все курсы' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.courseService.findAll(req.user);
  }

  @ApiTags('Course')
  @ApiOperation({ summary: 'Получить курс по айди' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.courseService.findOne(id, req.user);
  }

  @ApiTags('Course')
  @ApiOperation({ summary: 'Обновить курс' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiTags('Course')
  @ApiOperation({ summary: 'Загрузить аватар' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(uploadFileSchema)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/uploadCover')
  uploadAvatar(
    @Param('id') id: string,
    @UploadedFile('file') file: Express.Multer.File,
    @Request() req: RequestWithUser,
  ) {
    return this.courseService.uploadCover(id, file, req.user);
  }

  @ApiTags('Course')
  @ApiOperation({ summary: 'Удалить курс' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
