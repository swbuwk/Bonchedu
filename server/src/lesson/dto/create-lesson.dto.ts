import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  expirience: number;

  @ApiProperty()
  difficulty: number;

  @ApiProperty()
  chapterId: string;

  @ApiProperty()
  courseId: string;
}
