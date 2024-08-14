import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): string {
    return 'Welcome to Permissions System Manager';
  }
}
