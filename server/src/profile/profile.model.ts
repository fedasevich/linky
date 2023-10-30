import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { Link } from "../links/link.model";
import { User } from "../users/users.model";

interface GroupCreationAttrs {
  number: number;
  studAmount: number;
}

@Table({ tableName: "profile" })
export class Profile extends Model<Profile, GroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Unique
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @HasMany(() => Link)
  links: Link[];
}
