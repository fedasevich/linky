/* eslint-disable no-undefined */
/* eslint-disable no-await-in-loop */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Profile } from "../profile/profile.model";
import { User } from "../users/users.model";
import { ChangeLinkOrderDto } from "./dto/change-link-order.dto";
import { CreateLinkDto } from "./dto/create-link.dto";
import { LinkType } from "./link-types/linkType.model";
import { Link } from "./link.model";

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link) private linkRepository: typeof Link,
    private sequelize: Sequelize
  ) {}

  async createLink(dto: CreateLinkDto, req: Request & { user: User }) {
    const userId = req.user.id as number;
    const userProfile = await Profile.findOne({ where: { userId } });
    const maxOrder = ((await Link.max("order")) || 0) as number;
    const linkType = await LinkType.findOne({ where: { name: dto.type } });
    const { id: linkTypeId } = linkType;

    const link = await this.linkRepository.create({
      ...dto,
      linkTypeId,
      profileId: userProfile.id,
      order: maxOrder + 1,
    });
    return link;
  }

  async getLinkByProfileId(profileId: number) {
    const link = await this.linkRepository.findAll({
      where: { profileId },
      include: [
        {
          model: LinkType,
          as: "linkType",
        },
      ],
    });

    if (!link) {
      throw new HttpException(
        { message: "Wrong data" },
        HttpStatus.BAD_REQUEST
      );
    }

    return link;
  }

  async getAllLinks() {
    const links = await this.linkRepository.findAll();
    return links;
  }

  async changeLinkOrder(
    dto: ChangeLinkOrderDto,
    req: Request & { user: User }
  ) {
    const userId = req.user.id as number;
    const userProfile = await Profile.findOne({ where: { userId } });

    const record1 = await Link.findOne({
      where: { order: dto.from, profileId: userProfile.id },
    });
    const record2 = await Link.findOne({
      where: { order: dto.to, profileId: userProfile.id },
    });

    if (record1 && record2) {
      const record1Order = record1.order;
      const record2Order = record2.order;

      record1.order = -1;
      await record1.save();

      record2.order = record1Order;
      await record2.save();

      record1.order = record2Order;
      await record1.save();

      record1.order = record2Order;
      await record1.save();
    }
  }

  remove(id: number) {
    return Link.destroy({ where: { id } });
  }
}
