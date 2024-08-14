import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthBearer } from 'src/decorators';
import {
  CanCreateOrderGuard,
  CanViewOrderAsStaffOrBusinessGuard,
  CanViewOrderGuard,
} from 'src/guards';
import { getters, routes } from 'src/helpers';
import { User } from '../user/user.entity';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dtos';

@Controller(getters.getRoute([routes.order.entry]))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(routes.order.create)
  @AuthBearer()
  @UseGuards(CanCreateOrderGuard)
  async createOrder(
    @Req() req: Request,
    @Body(new ValidationPipe()) body: CreateOrderDto,
  ) {
    const user = req['user'] as User;

    const order = await this.orderService.createOrder(body, user);

    return {
      status: true,
      message: 'Successfully created order',
      payload: order,
    };
  }

  @Get(routes.order.getAll)
  @UseGuards(CanViewOrderGuard)
  async getAllOrders() {
    const order = await this.orderService.getAllOrders();

    return {
      status: true,
      message: 'Successfully gotten all orders',
      payload: order,
    };
  }

  @Get(routes.order.getAll)
  @UseGuards(CanViewOrderGuard)
  async getCustomerOrders(@Req() req: Request) {
    const user = req['user'] as User;

    const order = await this.orderService.getCustomerOrders(user);

    return {
      status: true,
      message: 'Successfully gotten all owned orders',
      payload: order,
    };
  }

  @Get(routes.order.getOrganization)
  @UseGuards(CanViewOrderAsStaffOrBusinessGuard)
  async getOrganizationOrders(@Req() req: Request) {
    const user = req['user'] as User;

    const order = await this.orderService.getOrganizationOrders(
      user.organization,
    );

    return {
      status: true,
      message: 'Successfully gotten all owned orders',
      payload: { orders: order, totalCount: order.length },
    };
  }

  @Get(routes.order.getOrganization)
  @UseGuards(CanViewOrderAsStaffOrBusinessGuard)
  async getOrganizationSingleOrder(
    @Req() req: Request,
    @Param(':id', new ValidationPipe()) orderId: number,
  ) {
    const user = req['user'] as User;

    const order = await this.orderService.getOrganizationSingleOrder(
      user.organization,
      orderId,
    );

    return {
      status: true,
      message: 'Successfully gotten organization order',
      payload: order,
    };
  }

  @Get(routes.order.getOrganization)
  @UseGuards(CanViewOrderGuard)
  async getSingleOrder(@Param(':id', new ValidationPipe()) orderId: number) {
    const order = await this.orderService.getSingleOrder(orderId);

    return {
      status: true,
      message: 'Successfully gotten organization order',
      payload: order,
    };
  }
}
