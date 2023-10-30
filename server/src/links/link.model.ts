import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { Profile } from "../profile/profile.model";
import { LinkType } from "./link-types/linkType.model";

interface LinkCreationAttrs {
  profileId: number;
  title: string;
  url: string;
  order: number;
  linkTypeId: number;
}

@Table({ tableName: "link" })
export class Link extends Model<Link, LinkCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Profile)
  @Column({ type: DataType.INTEGER, allowNull: false })
  profileId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Unique("profileId-order")
  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;

  @ForeignKey(() => LinkType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  linkTypeId: number;

  @BelongsTo(() => LinkType, "linkTypeId")
  linkType: LinkType;
}
