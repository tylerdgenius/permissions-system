import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationModule } from '../organization';
import { RoleModule } from '../role';
import { PermissionModule } from '../permission';

@Module({
  controllers: [UserController],
  imports: [
    DatabaseModule,
    OrganizationModule,
    RoleModule,
    forwardRef(() => PermissionModule),
  ],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
