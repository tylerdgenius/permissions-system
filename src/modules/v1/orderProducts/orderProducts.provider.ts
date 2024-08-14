import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { OrderProducts } from './orderProducts.entity';

export const orderProductsProviders = [
  {
    provide: constants.REPOSITORY.ORDER_PRODUCTS_PERMISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(OrderProducts);
    },
    inject: [constants.DATA_SOURCE],
  },
];
