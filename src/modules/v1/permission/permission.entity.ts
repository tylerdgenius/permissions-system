import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { PermissionEnums } from 'src/enums';
import { RolePermissions } from '../rolePermissions/rolePermissions.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PermissionEnums,
    default: PermissionEnums.ReadProduct,
  })
  action: string;

  @ManyToMany(() => RolePermissions, (role) => role.permission)
  rolePermissions: RolePermissions[];
}
