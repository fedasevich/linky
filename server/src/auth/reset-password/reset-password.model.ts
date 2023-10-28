import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/users.model";

interface ResetPasswordCreationAttrs {
  userId: number;
  token: string;
}

@Table({ tableName: "resetPassword" })
export class ResetPassword extends Model<
  ResetPassword,
  ResetPasswordCreationAttrs
> {
  @ApiProperty({ example: "1", description: "Unique ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "1", description: "Existing user id" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    description: "Reset password uuid",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  token: string;
}
