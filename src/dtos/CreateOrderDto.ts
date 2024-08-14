import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    description: 'This property details the identifier of the product',
  })
  @IsNotEmpty({
    message: 'products array is required',
  })
  @IsArray({
    message: 'products property must be an array',
  })
  products: {
    id: number;
    price: number;
    quantity: number;
  }[];

  @ApiProperty({
    required: true,
    description:
      'This property details the address of the person ordering the product',
  })
  @IsString({
    message: 'address must be of type string',
  })
  @IsNotEmpty({
    message: 'address is required',
  })
  address: string;
}
