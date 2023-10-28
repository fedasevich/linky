import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProfileDto } from "./dto/profile.dto";

import { Profile } from "./profile.model";
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile
  ) {}
  async createProfile(dto: ProfileDto) {
    const candidate = await this.profileRepository.findOne({
      where: { ...dto },
    });

    if (candidate) {
      throw new HttpException(
        { message: "Already exist" },
        HttpStatus.BAD_REQUEST
      );
    }

    const profile = await this.profileRepository.create(dto);
    return profile;
  }

  async getProfileByValue(dto: ProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: { ...dto },
    });

    if (!profile) {
      throw new HttpException(
        { message: "Wrong data" },
        HttpStatus.BAD_REQUEST
      );
    }

    return profile;
  }

  async getAllProfiles() {
    const profiles = await this.profileRepository.findAll();
    return profiles;
  }

  remove(id: number) {
    return Profile.destroy({ where: { id } });
  }
}
