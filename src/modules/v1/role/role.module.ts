import { Module, forwardRef } from '@nestjs/common';
import { permissionProviders } from './role.provider';
import { DatabaseModule } from 'src/database/database.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PermissionModule } from '../permission';
import { RolePermissionsModule } from '../rolePermissions';

@Module({
  controllers: [RoleController],
  imports: [
    DatabaseModule,
    forwardRef(() => PermissionModule),
    RolePermissionsModule,
  ],
  providers: [...permissionProviders, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
