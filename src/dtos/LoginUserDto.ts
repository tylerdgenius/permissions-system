import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    required: true,
    description: 'This property identifies the users email',
  })
  @IsEmail(undefined, {
    message: 'Invalid email provided. Kindly provide valid email',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsString({
    message: 'Email has to be of type string',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'This property identifies the users password',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Password has to be of type string',
  })
  password: string;
}
