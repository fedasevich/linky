import { IsNumber } from "class-validator";

export class DropChange {
  from: number;
  to: number;
}

export class ChangeLinkOrderDto {
  @IsNumber()
  from: number;
  @IsNumber()
  to: number;
}
