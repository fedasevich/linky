import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JWTGuardRegisterModule } from "../guards/jwt-auth/jwt-guard-register.module";
import { Profile } from "../profile/profile.model";
import { LinkController } from "./link.controller";
import { Link } from "./link.model";
import { LinkService } from "./link.service";

@Module({
  providers: [LinkService],
  controllers: [LinkController],
  imports: [
    SequelizeModule.forFeature([Link, Profile]),
    JWTGuardRegisterModule.register(),
  ],
  exports: [LinkService],
})
export class LinkModule {}
