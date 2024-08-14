import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  entry() {
    const message = this.appService.getMessage();

    return {
      message,
      payload: undefined,
      status: true,
    };
  }
}
