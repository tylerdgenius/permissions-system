import { constants } from 'src/helpers';
import { DataSource } from 'typeorm';
import { Product } from './product.entity';

export const productProviders = [
  {
    provide: constants.REPOSITORY.PRODUCT_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Product);
    },
    inject: [constants.DATA_SOURCE],
  },
];
