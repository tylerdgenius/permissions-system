import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/dtos';
import { getters, routes } from 'src/helpers';
import { ResponseObject } from 'src/models';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller(getters.getRoute(routes.user.entry))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(routes.user.create)
  async registerUser(
    @Body(new ValidationPipe()) data: CreateUserDto,
  ): Promise<ResponseObject<User>> {
    const registeredUser = await this.userService.registerUser(data);

    return {
      message: 'Successfully registered user',
      payload: registeredUser,
      status: true,
    };
  }

  @Post(routes.user.login)
  async loginUser(
    @Body(new ValidationPipe()) data: LoginUserDto,
  ): Promise<ResponseObject<User>> {
    const loggedInUser = await this.userService.loginUser(data);

    return {
      message: 'Successfully logged user in',
      payload: loggedInUser,
      status: true,
    };
  }

  @Post(routes.user.system)
  async generateSystemAdmin(@Body(new ValidationPipe()) data: CreateUserDto) {
    const registeredUser = await this.userService.registerUser(data);

    return {
      message: 'Successfully registered system admin',
      payload: registeredUser,
      status: true,
    };
  }
}
