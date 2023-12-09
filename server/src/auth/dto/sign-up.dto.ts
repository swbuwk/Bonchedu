import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class SignUpDto extends CreateUserDto {
    @ApiProperty()
    passwordRepeat: string;
}