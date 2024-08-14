import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from 'src/dtos';
import { User } from '../user/user.entity';
import { Organization } from '../organization/organization.entity';
import { ProductService } from '../product/product.service';
import { StatusEnums } from 'src/enums';
import { Product } from '../product/product.entity';
import { OrderProductsService } from '../orderProducts/orderProducts.service';
import axios from 'axios';

@Injectable()
export class OrderService {
  constructor(
    @Inject(constants.REPOSITORY.ORDER_REPOSITORY)
    private orderRepository: Repository<Order>,
    private readonly productService: ProductService,
    private readonly orderProductsService: OrderProductsService,
  ) {}

  async createOrder(body: CreateOrderDto, user: User) {
    let expectedTotalPrice: number;
    let passedInTotalPrice: number;
    let totalPrice = 0;

    const allProducts: Product[] = [];

    for (let i = 0; i < body.products.length; i++) {
      const baseProduct = body.products[i];

      if (!baseProduct.id || !baseProduct.price || !baseProduct.quantity) {
        throw new BadRequestException(
          'Each product must have an id property, a price property and a quantity property ',
        );
      }

      const product = await this.productService.getProduct(baseProduct.id);

      if (!product) {
        throw new BadRequestException(
          `Product with id - ${product.id} not found. Cannot create order for non-existent product`,
        );
      }

      expectedTotalPrice = product.price * baseProduct.quantity;
      passedInTotalPrice = baseProduct.price * baseProduct.quantity;

      if (expectedTotalPrice !== passedInTotalPrice) {
        throw new ConflictException(
          'Total price sent in does not match expected total price for that product',
        );
      }

      totalPrice = totalPrice + expectedTotalPrice;

      allProducts.push(product);
    }

    const order = new Order();

    order.address = body.address;
    order.createdAt = new Date();
    order.updatedAt = new Date();
    order.initiator = user;
    order.organization = user.organization;
    order.status = StatusEnums.Default;
    order.totalPrice = totalPrice;

    const savedOrder = await this.orderRepository.save(order);

    const finalOrder = await this.createOrderToProductLink(
      savedOrder,
      allProducts,
    );

    try {
      await this.logOrder(finalOrder, user);
    } catch (error) {}

    return finalOrder;
  }

  async createOrderToProductLink(order: Order, products: Product[]) {
    for (const element of products) {
      await this.orderProductsService.createOrderLink({
        order,
        product: element,
      });
    }

    return order;
  }

  async logOrder(order: Order, user: User) {
    const { data } = await axios.post(
      'https://taxes.free.beeceptor.com/log-tax',
      {
        amount: order.totalPrice,
        userEmail: user.email,
        shippingAddress: order.address,
      },
    );

    console.log(data);
  }

  async getCustomerOrders(user: User) {
    const orders = await this.orderRepository.find({
      where: {
        initiator: {
          id: user.id,
        },
      },
    });

    return orders;
  }

  async getOrganizationOrders(organization: Organization) {
    const orders = await this.orderRepository.find({
      where: {
        organization: {
          id: organization.id,
        },
      },
    });

    return orders;
  }

  async getOrganizationSingleOrder(
    organization: Organization,
    orderId: number,
  ) {
    const orders = await this.orderRepository.findOne({
      where: {
        organization,
        id: orderId,
      },
    });

    return orders;
  }

  async getSingleOrder(orderId: number) {
    const orders = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    return orders;
  }

  async getAllOrders() {
    return this.orderRepository.find();
  }
}
