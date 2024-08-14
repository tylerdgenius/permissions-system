import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { Role } from './role.entity';

export const permissionProviders = [
  {
    provide: constants.REPOSITORY.ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Role);
    },
    inject: [constants.DATA_SOURCE],
  },
];
