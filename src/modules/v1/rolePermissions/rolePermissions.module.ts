import { Module } from '@nestjs/common';

import { rolePermissionsProviders } from './rolePermissions.provider';
import { DatabaseModule } from 'src/database/database.module';
import { RolePermissionsService } from './rolePermissions.service';

@Module({
  imports: [DatabaseModule],
  providers: [...rolePermissionsProviders, RolePermissionsService],
  exports: [RolePermissionsService],
})
export class RolePermissionsModule {}
