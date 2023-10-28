import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth/jwt-auth.guard";
import { LinkDto } from "./dto/link.dto";
import { LinkService } from "./link.service";

@Controller("link")
export class LinkController {
  constructor(private linkService: LinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() LinkDto: LinkDto) {
    return this.linkService.createLink(LinkDto);
  }

  @Get("/:profileId")
  getByProfileId(@Param("profileId") profileId: number) {
    return this.linkService.getLinkByProfileId(profileId);
  }

  // @Get()
  // getAll() {
  //   return this.linkService.getAllLinks();
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.linkService.remove(id);
  }
}
