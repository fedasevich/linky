import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JWTGuardRegisterModule } from "../guards/jwt-auth/jwt-guard-register.module";
import { ProfileController } from "./profile.controller";
import { Profile } from "./profile.model";
import { ProfileService } from "./profile.service";

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile]),
    JWTGuardRegisterModule.register(),
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
