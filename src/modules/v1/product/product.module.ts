import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from './product.provider';
import { UserModule } from '../user';
import { IsProtectedMiddleware } from 'src/middleware';
import { getters, routes } from 'src/helpers';
import { RolePermissionsModule } from '../rolePermissions';

@Module({
  controllers: [ProductController],
  imports: [DatabaseModule, UserModule, RolePermissionsModule],
  providers: [...productProviders, ProductService],
  exports: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsProtectedMiddleware)
      .exclude(
        getters.getRoute([routes.product.entry, routes.product.getAll]),
        getters.getRoute([routes.product.entry, routes.product.getSingle]),
      ) //So that everyone including customers can view all the products in the system as well as single products
      .forRoutes(getters.getRoute(routes.product.entry));
  }
}
