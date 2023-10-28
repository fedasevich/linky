import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Link } from "../link.model";

interface GroupCreationAttrs {
  number: number;
  studAmount: number;
}

@Table({ tableName: "linkType" })
export class LinkType extends Model<LinkType, GroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Link)
  links: Link[];
}
