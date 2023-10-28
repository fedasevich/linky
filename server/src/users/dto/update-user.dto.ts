import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class UpdateUserDto {
  @ApiProperty({ example: "1234", description: "New user password." })
  @IsString()
  password: string;
}
