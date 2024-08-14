import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { permissionProviders } from './permission.provider';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionController } from './permission.controller';
import { RolePermissionsModule } from '../rolePermissions';
import { UserModule } from '../user';
import { IsProtectedMiddleware } from 'src/middleware';
import { getters, routes } from 'src/helpers';

@Module({
  controllers: [PermissionController],
  imports: [
    DatabaseModule,
    forwardRef(() => UserModule),
    RolePermissionsModule,
  ],
  providers: [...permissionProviders, PermissionService],
  exports: [PermissionService],
})
export class PermissionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsProtectedMiddleware)
      .exclude(
        getters.getRoute([
          routes.permissions.entry,
          routes.permissions.createDefault,
        ]),
      )
      .forRoutes(getters.getRoute(routes.permissions.entry));
  }
}
