import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResetPasswordConfirmDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  @IsString()
  token: string;

  @ApiProperty({ example: "1234", description: "New user password." })
  @IsString()
  password: string;
}
