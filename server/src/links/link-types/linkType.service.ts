import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LinkTypeDto } from "./dto/linkType.dto";

import { LinkType } from "./linkType.model";
@Injectable()
export class LinkTypeService {
  constructor(
    @InjectModel(LinkType) private linkTypeRepository: typeof LinkType
  ) {}
  async createLinkType(dto: LinkTypeDto) {
    const candidate = await this.linkTypeRepository.findOne({
      where: { ...dto },
    });

    if (candidate) {
      throw new HttpException(
        { message: "Already exist" },
        HttpStatus.BAD_REQUEST
      );
    }

    const linkType = await this.linkTypeRepository.create(dto);
    return linkType;
  }

  async getLinkTypeByValue(dto: LinkTypeDto) {
    const linkType = await this.linkTypeRepository.findOne({
      where: { ...dto },
    });

    if (!linkType) {
      throw new HttpException(
        { message: "Wrong data" },
        HttpStatus.BAD_REQUEST
      );
    }

    return linkType;
  }

  async getAllLinkTypes() {
    const linkTypes = await this.linkTypeRepository.findAll();
    return linkTypes;
  }

  remove(id: number) {
    return LinkType.destroy({ where: { id } });
  }
}
