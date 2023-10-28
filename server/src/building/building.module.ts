import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BuildingController } from "./building.controller";
import { Building } from "./building.model";
import { BuildingService } from "./building.service";

@Module({
  providers: [BuildingService],
  controllers: [BuildingController],
  imports: [SequelizeModule.forFeature([Building])],
  exports: [BuildingService],
})
export class BuildingModule {}
