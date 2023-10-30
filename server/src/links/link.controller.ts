import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth/jwt-auth.guard";
import { User } from "../users/users.model";
import { ChangeLinkOrderDto } from "./dto/change-link-order.dto";
import { CreateLinkDto } from "./dto/create-link.dto";
import { LinkService } from "./link.service";

@Controller("link")
export class LinkController {
  constructor(private linkService: LinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateLinkDto, @Req() req: Request & { user: User }) {
    return this.linkService.createLink(dto, req);
  }

  @Get("/:profileId")
  getByProfileId(@Param("profileId") profileId: number) {
    return this.linkService.getLinkByProfileId(profileId);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  changeLinkOrder(
    @Body() dto: ChangeLinkOrderDto,
    @Req() req: Request & { user: User }
  ) {
    return this.linkService.changeLinkOrder(dto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.linkService.remove(id);
  }
}
