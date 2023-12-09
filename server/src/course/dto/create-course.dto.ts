import { ApiProperty } from "@nestjs/swagger"

export class CreateCourseDto {
    @ApiProperty()
    name: string

    @ApiProperty({nullable: true})
    description?: string
}
