import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LinkTypeController } from "./linkType.controller";
import { LinkType } from "./linkType.model";
import { LinkTypeService } from "./linkType.service";

@Module({
  providers: [LinkTypeService],
  controllers: [LinkTypeController],
  imports: [SequelizeModule.forFeature([LinkType])],
  exports: [LinkTypeService],
})
export class LinkTypeModule {}
