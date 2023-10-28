import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LinkDto } from "./dto/link.dto";

import { LinkType } from "./link-types/linkType.model";
import { Link } from "./link.model";
@Injectable()
export class LinkService {
  constructor(@InjectModel(Link) private linkRepository: typeof Link) {}
  async createLink(dto: LinkDto) {
    const link = await this.linkRepository.create(dto);
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

  remove(id: number) {
    return Link.destroy({ where: { id } });
  }
}
