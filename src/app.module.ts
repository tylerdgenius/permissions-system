import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getCurrentAppModulesToLoad } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...getCurrentAppModulesToLoad(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
