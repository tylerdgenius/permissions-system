import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { constants, getters } from './helpers';
import { StatusCodeInterceptor, TransformInterceptor } from './interceptors';
import { ValidationExceptionFilter } from './filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(constants.SWAGGER.TITLE)
    .setDescription(constants.SWAGGER.DESCRIPTION)
    .setVersion(constants.SWAGGER.VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(constants.SWAGGER.PATH, app, document);

  app.useGlobalInterceptors(new StatusCodeInterceptor());

  app.useGlobalFilters(new ValidationExceptionFilter());

  const port = getters.getConfigService().get<number>('APP_PORT', 3000);

  getters.getLogger().log(constants.APP.RUNNING_PORT + port);

  app.enableCors();

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
}
bootstrap();
