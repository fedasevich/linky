import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProfileController } from "./profile.controller";
import { Profile } from "./profile.model";
import { ProfileService } from "./profile.service";

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [SequelizeModule.forFeature([Profile])],
  exports: [ProfileService],
})
export class ProfileModule {}
