import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationModule } from '../organization';
import { PermissionModule } from '../permission';
import { RoleModule } from '../role';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { UserService } from './user.service';

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
