import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class BuildingDto {
  @ApiProperty({
    example: 1,
    description: "The unique identifier for the building",
  })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: "Sample Building",
    description: "The name of the building",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1000000,
    description: "The total price of the building",
  })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ example: 5000, description: "The price per square meter" })
  @IsNumber()
  squareMeterPrice: number;

  @ApiProperty({ example: 0.05, description: "The yield percentage" })
  @IsNumber()
  yield: number;

  @ApiProperty({ example: 50, description: "The number of units sold" })
  @IsNumber()
  sold: number;

  @ApiProperty({
    example: "2023-10-16T12:00:00.000Z",
    description: "The end date of the building project",
  })
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    example: "12a7f996-76b8-4376-a410-6d6bb59a062e.png",
    description: "The url to image",
  })
  @IsString()
  imageUrl: number;
}
