import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserDto, LoginUserDto } from 'src/dtos';
import { getters, routes } from 'src/helpers';
import { ResponseObject } from 'src/models';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller(getters.getRoute(routes.user.entry))
export class UserController {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly userService: UserService,
    private readonly mailService: MailerService,
  ) {}

  @Post(routes.user.create)
  async registerUser(
    @Body(new ValidationPipe()) data: CreateUserDto,
  ): Promise<ResponseObject<User>> {
    const registeredUser = await this.userService.registerUser(data);

    this.eventEmitter.emit('user.created', registeredUser);

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

  @Get()
  async testConfig() {
    await this.mailService.sendMail({
      to: 'albertnwachukwu@gmail.com',
      subject: 'Welcome to My App! Confirm your Email',
      template: './registration.hbs',
      context: {
        firstName: 'User',
        otp: '272829',
        supportUrl: 'test',
      },
    });
  }
}
