import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TokenResponseDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  @IsString()
  token: string;
}
