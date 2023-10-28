import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "../../users/users.module";
import { AuthModule } from "../auth.module";
import { ResetPasswordController } from "./reset-password.controller";
import { ResetPassword } from "./reset-password.model";
import { ResetPasswordService } from "./reset-password.service";

@Module({
  providers: [ResetPasswordService],
  controllers: [ResetPasswordController],
  imports: [
    forwardRef(() => UsersModule),
    AuthModule,
    SequelizeModule.forFeature([ResetPassword]),
  ],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
