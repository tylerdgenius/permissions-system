import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { Permission } from './permission.entity';

export const permissionProviders = [
  {
    provide: constants.REPOSITORY.PERMISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Permission);
    },
    inject: [constants.DATA_SOURCE],
  },
];
