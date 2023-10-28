import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JWTGuardRegisterModule } from "../guards/jwt-auth/jwt-guard-register.module";

import { User } from "./users.model";
import { UsersService } from "./users.service";

@Module({
  controllers: [],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    JWTGuardRegisterModule.register(),
  ],
  exports: [UsersService],
})
export class UsersModule {}
