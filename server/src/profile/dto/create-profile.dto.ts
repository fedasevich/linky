import { IsNumber, IsString } from "class-validator";

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  description: number;

  @IsNumber()
  userId: number;
}
