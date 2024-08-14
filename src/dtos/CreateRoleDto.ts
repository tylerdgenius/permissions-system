import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    required: true,
    description: 'This property identifies the role name',
  })
  @IsNotEmpty({
    message: 'Role name is required',
  })
  @IsString({
    message: 'Role name has to be of type string',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: 'This property identifies the role description',
  })
  @IsNotEmpty({
    message: 'Role description is required',
  })
  @IsString({
    message: 'Role description has to be of type string',
  })
  description: string;
}
