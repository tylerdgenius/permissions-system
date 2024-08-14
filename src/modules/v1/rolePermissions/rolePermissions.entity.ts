import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '../role/role.entity';
import { Permission } from '../permission/permission.entity';

@Entity()
export class RolePermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  permission: Permission;
}
