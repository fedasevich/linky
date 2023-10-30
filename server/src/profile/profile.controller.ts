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
import { ChangeDescriptionDto } from "./dto/change-description.dto";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateProfileDto, @Req() req: Request & { user: User }) {
    return this.profileService.createProfile(dto, req);
  }

  @Get("name/:name")
  getByUserName(@Param("name") name: number) {
    return this.profileService.getProfileByUserName(name.toString());
  }

  @Get("user/:userId")
  getByUserId(@Param("userId") userId: number) {
    return this.profileService.getProfileByUserId(userId);
  }

  @Put("description")
  @UseGuards(JwtAuthGuard)
  changeDescription(
    @Body() dto: ChangeDescriptionDto,
    @Req() req: Request & { user: User }
  ) {
    return this.profileService.changeDescription(dto, req);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.profileService.remove(id);
  }
}
