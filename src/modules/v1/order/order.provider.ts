import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';

export const orderProviders = [
  {
    provide: constants.REPOSITORY.ORDER_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Order);
    },
    inject: [constants.DATA_SOURCE],
  },
];
