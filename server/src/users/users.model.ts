import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { ResetPassword } from "../auth/reset-password/reset-password.model";
import { Profile } from "../profile/profile.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "test@gmail.com", description: "User email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @ApiProperty({ example: "12345", description: "User password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => ResetPassword)
  resetPasswords: ResetPassword[];

  @HasOne(() => Profile)
  profile: Profile;
}
