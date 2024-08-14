import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.organization)
  products: Product[];

  @OneToMany(() => Order, (order) => order.organization)
  orders: Order[];

  @OneToMany(() => User, (user) => user.organization)
  staff: User[];

  @OneToMany(() => Role, (role) => role.organization)
  roles: Role[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
