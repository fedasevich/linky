import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { BuildingService } from "./building.service";
import { BuildingDto } from "./dto/building.dto";

@Controller("building")
export class BuildingController {
  constructor(private buildingService: BuildingService) {}
  @Post()
  create(@Body() BuildingDto: BuildingDto) {
    return this.buildingService.createBuilding(BuildingDto);
  }

  @Get("/:building")
  getByValue(@Param() params: BuildingDto) {
    return this.buildingService.getBuildingByValue(params);
  }

  @Get()
  getAll() {
    return this.buildingService.getAllBuildings();
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.buildingService.remove(id);
  }
}
