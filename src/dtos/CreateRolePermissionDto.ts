import { Permission } from 'src/modules/v1/permission/permission.entity';
import { Role } from 'src/modules/v1/role/role.entity';

export class CreateRolePermissionDto {
  role: Role;
  permission: Permission;
}
