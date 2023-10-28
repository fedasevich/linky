import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class GenerateResetLinkDto {
  @ApiProperty({
    example: "test@gmail.com",
    description: "Email of the user",
  })
  @IsString({ message: "Must be string" })
  @IsEmail({}, { message: "Wrong e-mail" })
  email: string;
}
