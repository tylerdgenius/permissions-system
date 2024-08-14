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
import { getters, routes } from 'src/helpers';
import { ResponseObject } from 'src/models';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { AuthBearer } from 'src/decorators';
import { CreateProductDto } from 'src/dtos';
import { CanCreateProductGuard } from 'src/guards';
import { CanViewProductGuard } from 'src/guards/product/canViewProducts.guard';
import { User } from '../user/user.entity';

@Controller(getters.getRoute(routes.product.entry))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(routes.product.create)
  @AuthBearer()
  @UseGuards(CanCreateProductGuard)
  async createProduct(
    @Req() req: Request,
    @Body(new ValidationPipe()) body: CreateProductDto,
  ) {
    const user = req['user'] as User;

    const product = await this.productService.createProduct(body, user);

    return {
      status: true,
      message: 'Successfully created product',
      payload: product,
    };
  }

  @Get(routes.product.getAll)
  async getAllProducts() {
    const products = await this.productService.getAllProducts();

    return {
      status: true,
      message: 'Successfully fetched all products',
      payload: products,
    };
  }

  // Currently restricted so only members of that organization can see the organization products using this filtered method
  @Get(routes.product.getOwned)
  @AuthBearer()
  @UseGuards(CanViewProductGuard) // To confirm that a user can actually view the company's resources
  async getOwnedProducts(@Req() req: Request) {
    const user = req['user'] as User;

    const products = await this.productService.getProductsByOrganizationId(
      user.organization.id,
    );

    return {
      status: true,
      message: 'Successfully fetched owned products',
      payload: products,
    };
  }

  @Get(routes.product.getInitiator)
  @AuthBearer()
  @UseGuards(CanViewProductGuard)
  async getInitiatorProducts(@Req() req: Request) {
    const user = req['user'] as User;
    const products = await this.productService.getProductsByInitiator(user.id);

    return {
      status: true,
      message: 'Successfully fetched user posted products',
      payload: products,
    };
  }

  @Get(routes.product.getSingle)
  @AuthBearer()
  async getSingleProduct(
    @Req() req: Request,
    @Param('id', new ValidationPipe()) id: number,
  ): Promise<ResponseObject<Product>> {
    const product = await this.productService.getProduct(id);

    return {
      status: true,
      message: 'Successfully fetched product',
      payload: product,
    };
  }
}
