import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { RolePermissions } from './rolePermissions.entity';

export const rolePermissionsProviders = [
  {
    provide: constants.REPOSITORY.ROLE_PERMISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(RolePermissions);
    },
    inject: [constants.DATA_SOURCE],
  },
];
