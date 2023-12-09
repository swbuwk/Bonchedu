import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty()
    login: string

    @ApiProperty()
    password: string
    
    @ApiProperty()
    username: string
    
    @ApiProperty({nullable: true})
    info?: string
}
