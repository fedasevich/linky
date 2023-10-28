import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BuildingDto } from "./dto/building.dto";

import { Building } from "./building.model";
@Injectable()
export class BuildingService {
  constructor(
    @InjectModel(Building) private buildingRepository: typeof Building
  ) {}
  async createBuilding(dto: BuildingDto) {
    const candidate = await this.buildingRepository.findOne({
      where: { ...dto },
    });

    if (candidate) {
      throw new HttpException(
        { message: "Already exist" },
        HttpStatus.BAD_REQUEST
      );
    }

    const building = await this.buildingRepository.create(dto);
    return building;
  }

  async getBuildingByValue(dto: BuildingDto) {
    const building = await this.buildingRepository.findOne({
      where: { ...dto },
    });

    if (!building) {
      throw new HttpException(
        { message: "Wrong data" },
        HttpStatus.BAD_REQUEST
      );
    }

    return building;
  }

  async getAllBuildings() {
    const buildings = await this.buildingRepository.findAll();
    return buildings;
  }

  remove(id: number) {
    return Building.destroy({ where: { id } });
  }
}
