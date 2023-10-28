import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ProfileDto } from "./dto/profile.dto";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Post()
  create(@Body() ProfileDto: ProfileDto) {
    return this.profileService.createProfile(ProfileDto);
  }

  @Get("/:profile")
  getByValue(@Param() params: ProfileDto) {
    return this.profileService.getProfileByValue(params);
  }

  @Get()
  getAll() {
    return this.profileService.getAllProfiles();
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.profileService.remove(id);
  }
}
