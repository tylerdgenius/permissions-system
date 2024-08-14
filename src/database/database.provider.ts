import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { constants, getters } from 'src/helpers';

const shouldSynchronize = getters.getDevelopmentStatus();

export const databaseProviders = [
  {
    provide: constants.DATA_SOURCE,
    useFactory: async (
      configService: ReturnType<typeof getters.getConfigService>,
    ) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USENAME'),
        password: configService.get('DATEBASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: shouldSynchronize,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
