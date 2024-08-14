import { Module } from '@nestjs/common';

import { orderProductsProviders } from './orderProducts.provider';
import { DatabaseModule } from 'src/database/database.module';
import { OrderProductsService } from './orderProducts.service';

@Module({
  imports: [DatabaseModule],
  providers: [...orderProductsProviders, OrderProductsService],
  exports: [OrderProductsService],
})
export class OrderProductsModule {}
