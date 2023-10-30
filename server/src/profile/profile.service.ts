import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Op } from "sequelize";
import { LinkType } from "../links/link-types/linkType.model";
import { Link } from "../links/link.model";
import { User } from "../users/users.model";
import { ChangeDescriptionDto } from "./dto/change-description.dto";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { Profile } from "./profile.model";
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile
  ) {}

  async createProfile(dto: CreateProfileDto, req: Request & { user: User }) {
    const userId = req.user.id;

    if (userId !== dto.userId) {
      throw new HttpException(
        { message: "Wrong data" },
        HttpStatus.BAD_REQUEST
      );
    }

    const candidate = await this.profileRepository.findOne({
      where: {
        [Op.or]: [{ name: dto.name }, { userId }],
      },
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

  async getProfileByUserName(name: string) {
    const profile = await this.profileRepository.findOne({
      where: { name },
      include: [
        {
          model: Link,
          include: [
            {
              model: LinkType,
              as: "linkType",
            },
          ],
        },
      ],
      order: [[{ model: Link, as: "links" }, "order", "ASC"]],
    });

    if (!profile) {
      throw new HttpException(
        { message: "Such profile doesn't exist." },
        HttpStatus.BAD_REQUEST
      );
    }

    return profile;
  }

  async getProfileByUserId(userId: number) {
    const profile = await this.profileRepository.findOne({
      where: { userId },
      include: [
        {
          model: Link,
          include: [
            {
              model: LinkType,
              as: "linkType",
            },
          ],
        },
      ],
      order: [[{ model: Link, as: "links" }, "order", "ASC"]],
    });

    if (!profile) {
      throw new HttpException(
        { message: "Such profile doesn't exist." },
        HttpStatus.BAD_REQUEST
      );
    }

    return profile;
  }

  async changeDescription(
    dto: ChangeDescriptionDto,
    req: Request & { user: User }
  ) {
    const userId = req.user.id as number;

    const updatedProfile = await Profile.update(
      { ...dto },
      {
        where: { userId },
      }
    );
    return updatedProfile;
  }

  async getAllProfiles() {
    const profiles = await this.profileRepository.findAll();
    return profiles;
  }

  remove(id: number) {
    return Profile.destroy({ where: { id } });
  }
}
