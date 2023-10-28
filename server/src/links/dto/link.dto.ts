import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class LinkDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  profileId: number;

  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsNumber()
  order: number;

  @IsNumber()
  linkTypeId: number;
}
