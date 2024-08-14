import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { IsDate } from 'class-validator';
import { StatusDto } from 'src/dtos';
import { StatusEnums } from 'src/enums';
import { Organization } from '../organization/organization.entity';
import { User } from '../user/user.entity';
import { OrderProducts } from '../orderProducts/orderProducts.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.products)
  initiator: User;

  @ManyToOne(() => Organization, (organization) => organization.products)
  organization: Organization;

  @ManyToMany(() => OrderProducts, (orderProducts) => orderProducts.product)
  orderProducts: OrderProducts[];

  @Column({
    type: 'enum',
    enum: StatusEnums,
    default: 'active',
  })
  status: StatusDto['status'];

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;
}
