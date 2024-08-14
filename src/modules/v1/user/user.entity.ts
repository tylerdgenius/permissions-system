import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { StatusEnums, TypesEnum } from 'src/enums';
import { Organization } from '../organization/organization.entity';
import { Product } from '../product/product.entity';
import { Exclude } from 'class-transformer';
import { Role } from '../role/role.entity';
import { Order } from '../order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: TypesEnum,
    default: TypesEnum.User,
  })
  type: string;

  @ManyToOne(() => Organization, (organization) => organization.staff)
  organization: Organization;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Product, (product) => product.initiator)
  products: Product[];

  @OneToMany(() => Product, (product) => product.initiator)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
