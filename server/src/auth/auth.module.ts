import { Module, forwardRef } from "@nestjs/common";
import { JWTGuardRegisterModule } from "../guards/jwt-auth/jwt-guard-register.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule), JWTGuardRegisterModule.register()],
  exports: [AuthService],
})
export class AuthModule {}
