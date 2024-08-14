import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    required: true,
    description: 'This property identifies the organizations name',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name has to be of type string',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: 'This property identifies the organizations owner id',
  })
  @IsNotEmpty({
    message: 'Owner id is required',
  })
  @IsString({
    message: 'Owner id has to be of type string',
  })
  @IsUUID('4', {
    message: '',
  })
  ownerId: string;
}
