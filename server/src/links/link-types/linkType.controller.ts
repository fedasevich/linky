import { Controller, Get, Param } from "@nestjs/common";
import { LinkTypeDto } from "./dto/linkType.dto";
import { LinkTypeService } from "./linkType.service";

@Controller("linkType")
export class LinkTypeController {
  constructor(private linkTypeService: LinkTypeService) {}

  @Get("/:linkType")
  getByValue(@Param() params: LinkTypeDto) {
    return this.linkTypeService.getLinkTypeByValue(params);
  }

  @Get()
  getAll() {
    return this.linkTypeService.getAllLinkTypes();
  }
}
