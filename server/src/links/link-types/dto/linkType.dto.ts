import { IsNumber, IsOptional, IsString } from "class-validator";

export class LinkTypeDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
