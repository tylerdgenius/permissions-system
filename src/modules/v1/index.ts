import { OrderModule } from './order';
import { OrderProductsModule } from './orderProducts';
import { OrganizationModule } from './organization';
import { PermissionModule } from './permission';
import { ProductModule } from './product';
import { RoleModule } from './role';
import { RolePermissionsModule } from './rolePermissions';
import { UserModule } from './user';

export const modules = [
  UserModule,
  OrganizationModule,
  ProductModule,
  OrderModule,
  PermissionModule,
  RoleModule,
  RolePermissionsModule,
  OrderProductsModule,
];
