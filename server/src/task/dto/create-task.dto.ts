import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto {
    @ApiProperty()
    question: string
    
    @ApiProperty()
    lessonId: string
}
