import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Organization } from '../organization/organization.entity';
import { RolePermissions } from '../rolePermissions/rolePermissions.entity';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Organization, (organization) => organization.roles)
  organization: Organization;

  @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.role)
  rolePermissions: RolePermissions[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
