import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from 'src/database/database.module';
import { orderProviders } from './order.provider';
import { RolePermissionsModule } from '../rolePermissions';
import { IsProtectedMiddleware } from 'src/middleware';
import { getters, routes } from 'src/helpers';
import { UserModule } from '../user';
import { ProductModule } from '../product';
import { OrderProductsModule } from '../orderProducts';

@Module({
  controllers: [OrderController],
  imports: [
    DatabaseModule,
    ProductModule,
    RolePermissionsModule,
    UserModule,
    OrderProductsModule,
  ],
  providers: [...orderProviders, OrderService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsProtectedMiddleware)
      .forRoutes(getters.getRoute(routes.order.entry));
  }
}
