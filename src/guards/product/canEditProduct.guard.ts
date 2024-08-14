import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PermissionEnums } from 'src/enums';
import { RolePermissionsService } from 'src/modules/v1/rolePermissions/rolePermissions.service';
import { User } from 'src/modules/v1/user/user.entity';

@Injectable()
export class CanEditProductGuard implements CanActivate {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request['user'] as User;

    const rolePermissions =
      await this.rolePermissionsService.findRolePermissionsByRoleId(
        user.role.id,
      );

    if (
      rolePermissions.find(
        (_) => _.permission.action === PermissionEnums.UpdateProduct,
      )
    ) {
      return true;
    }

    return false;
  }
}
