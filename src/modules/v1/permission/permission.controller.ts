import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionEnums } from 'src/enums';
import { getters, routes } from 'src/helpers';
import { CreatePermissionDto } from 'src/dtos';
import { CanAddPermissionGuard, CanViewPermissionGuard } from 'src/guards';

const allPermissions = [
  PermissionEnums.CreateOrder,
  PermissionEnums.CreateProduct,
  PermissionEnums.CreateUser,
  PermissionEnums.DeleteOrder,
  PermissionEnums.DeleteProduct,
  PermissionEnums.DeleteUser,
  PermissionEnums.ReadOrder,
  PermissionEnums.ReadProduct,
  PermissionEnums.ReadUser,
  PermissionEnums.UpdateOrder,
  PermissionEnums.UpdateProduct,
  PermissionEnums.UpdateUser,
  PermissionEnums.CreateRole,
  PermissionEnums.UpdateRole,
  PermissionEnums.ReadRole,
  PermissionEnums.DeleteRole,
  PermissionEnums.CreateOrganization,
  PermissionEnums.UpdateOrganization,
  PermissionEnums.ReadOrganization,
  PermissionEnums.DeleteOrganization,
  PermissionEnums.CreatePermission,
  PermissionEnums.UpdatePermission,
  PermissionEnums.ReadPermission,
  PermissionEnums.DeletePermission,
];

@Controller(getters.getRoute(routes.permissions.entry))
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post(routes.permissions.createDefault)
  async createPermissions() {
    for (const element of allPermissions) {
      await this.permissionService.createPermission({
        action: element,
      });
    }

    return {
      status: true,
      message: 'Created all base permissions successfully',
      payload: allPermissions,
    };
  }

  @Get(routes.permissions.getAll)
  @UseGuards(CanViewPermissionGuard)
  async getAllPermissions() {
    const permissions = await this.permissionService.getAllPermissions();

    return {
      status: true,
      message: 'Successfully gotten all base permissions',
      payload: permissions,
    };
  }

  @Get(routes.permissions.getViews)
  @UseGuards(CanViewPermissionGuard)
  async getAllViewPermissions() {
    const permissions = await this.permissionService.getAllViewPermissions();

    return {
      status: true,
      message: 'Successfully gotten all base view permissions',
      payload: permissions,
    };
  }

  @Post(routes.permissions.add)
  @UseGuards(CanAddPermissionGuard)
  async addPermission(@Body(new ValidationPipe()) body: CreatePermissionDto) {
    const permissions = await this.permissionService.createPermission({
      action: body.action,
    });

    return {
      status: true,
      message: 'Successfully added permission to global available permissions',
      payload: permissions,
    };
  }
}
