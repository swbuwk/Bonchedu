import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty()
    roleName: string
}