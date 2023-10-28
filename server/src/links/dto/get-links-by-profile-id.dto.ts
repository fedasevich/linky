import { IsNumber } from "class-validator";

export class GetLinksByProfileIdDto {
  @IsNumber()
  profileId: number;
}
