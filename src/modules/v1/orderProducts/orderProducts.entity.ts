import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';

@Entity()
export class OrderProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;
}
