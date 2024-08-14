import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { PermissionService } from '../permission/permission.service';
import { CreateRoleDto } from 'src/dtos';
import { Organization } from '../organization/organization.entity';
import { RolePermissionsService } from '../rolePermissions/rolePermissions.service';
import { Permission } from '../permission/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject(constants.REPOSITORY.ROLE_REPOSITORY)
    private roleRepository: Repository<Role>,
    private permissionsService: PermissionService,
    private rolePermissionsService: RolePermissionsService,
  ) {}

  async findOne(filter: Partial<Role>) {
    return this.roleRepository.findOne({
      where: {
        ...filter,
      },
    });
  }

  async createRole(
    roleData: CreateRoleDto & {
      organization: Organization;
    },
  ) {
    const role = new Role();
    role.description = roleData.description;
    role.name = roleData.name;
    role.organization = roleData.organization;

    return this.roleRepository.save(role);
  }

  async createRoleByPermissions(
    name: string,
    description: string,
    organization: Organization,
    permissions: Permission[],
  ) {
    const role = await this.createRole({
      description,
      name,
      organization,
    });

    for (const element of permissions) {
      await this.rolePermissionsService.createRolePermission({
        role,
        permission: element,
      });
    }

    return role;
  }

  async createSuperAdminRole(organization: Organization) {
    const permissions =
      await this.permissionsService.getSuperAdminPermissions();

    return this.createRoleByPermissions(
      'SUPER_ADMIN',
      'This role is the primary role created for every business after their signup',
      organization,
      permissions,
    );
  }

  async createSystemAdminRole(organization: Organization) {
    const permissions = await this.permissionsService.getAllPermissions();

    return this.createRoleByPermissions(
      'SYSTEM_ADMIN',
      'This role is the primary role created for only system admins',
      organization,
      permissions,
    );
  }

  async createViewRole(organization: Organization) {
    const permissions = await this.permissionsService.getAllViewPermissions();

    return this.createRoleByPermissions(
      'VIEWER',
      'This role is the primary role created for every normal staff or customer until their roles are altered. It allows them view users, orders or products',
      organization,
      permissions,
    );
  }

  async createCustomerBasicRole(organization: Organization) {
    const permissions =
      await this.permissionsService.getCustomerBasicPermissions();

    return this.createRoleByPermissions(
      'BASE_CUSTOMER',
      'This role allows the created user to do all view permissions as well as create orders',
      organization,
      permissions,
    );
  }
}
