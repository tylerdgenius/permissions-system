import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { Organization } from './organization.entity';

export const organizationProviders = [
  {
    provide: constants.REPOSITORY.ORGANIZATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Organization);
    },
    inject: [constants.DATA_SOURCE],
  },
];
