import { Order } from 'src/modules/v1/order/order.entity';
import { Product } from 'src/modules/v1/product/product.entity';

export class CreateOrderProductsDto {
  order: Order;
  product: Product;
}
