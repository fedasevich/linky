import { IsString } from "class-validator";

export class ChangeDescriptionDto {
  @IsString()
  description: string;
}
