import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';
import { Organization } from '../organization/organization.entity';
import { User } from '../user/user.entity';
import { OrderProducts } from '../orderProducts/orderProducts.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  initiator: User;

  @ManyToOne(() => Organization, (organization) => organization.orders)
  organization: Organization;

  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order)
  orderProducts: OrderProducts[];

  @Column()
  address: string;

  @Column()
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  status: StatusDto['status'];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
