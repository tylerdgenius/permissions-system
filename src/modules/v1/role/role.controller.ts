import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { getters, routes } from 'src/helpers';

@Controller(getters.getRoute(routes.roles.entry))
export class RoleController {
  constructor(private readonly permissionsService: RoleService) {}
}
