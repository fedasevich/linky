import { IsString } from "class-validator";

export class ResetPasswordTokenDto {
  @IsString({ message: "$property must be string" })
  token: string;
}
