import { DataSource } from 'typeorm';
import { constants } from 'src/helpers';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: constants.REPOSITORY.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(User);
    },
    inject: [constants.DATA_SOURCE],
  },
];
