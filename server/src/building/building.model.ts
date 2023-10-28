import { Column, DataType, Model, Table } from "sequelize-typescript";

interface GroupCreationAttrs {
  number: number;
  studAmount: number;
}

@Table({ tableName: "building" })
export class Building extends Model<Building, GroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  totalPrice: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  squareMeterPrice: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  yield: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  sold: number;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imageUrl: string;
}
