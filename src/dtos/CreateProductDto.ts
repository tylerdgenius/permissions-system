import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    description: 'This property details the name of the product',
  })
  @IsString({
    message: 'Name must be of type string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: 'This property details the price of the product',
  })
  @IsNumber(
    {},
    {
      message: 'Price must be of type number',
    },
  )
  @IsNotEmpty({
    message: 'Price is required',
  })
  price: number;

  @ApiProperty({
    required: true,
    description: 'This property details the description of the product',
  })
  @IsString({
    message: 'Description must be of type string',
  })
  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;
}
