import { Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { OrderProducts } from './orderProducts.entity';
import { CreateOrderProductsDto } from 'src/dtos';

@Injectable()
export class OrderProductsService {
  constructor(
    @Inject(constants.REPOSITORY.ORDER_PRODUCTS_PERMISSION_REPOSITORY)
    private orderProductsRepository: Repository<OrderProducts>,
  ) {}

  async findOne(filter: Partial<OrderProducts>) {
    return this.orderProductsRepository.findOne({
      where: {
        ...filter,
      },
    });
  }

  async getAllPermissions() {
    return this.orderProductsRepository.find();
  }

  async createOrderLink(orderProductsData: CreateOrderProductsDto) {
    const rolePermission = new OrderProducts();

    rolePermission.order = orderProductsData.order;
    rolePermission.product = orderProductsData.product;

    return this.orderProductsRepository.save(rolePermission);
  }

  async findOrderProductsByOrderId(orderId: number) {
    return this.orderProductsRepository
      .createQueryBuilder('order_products')
      .leftJoinAndSelect('order_products.product', 'product')
      .where('order_products.orderId = :orderId', { orderId })
      .getMany();
  }
}
