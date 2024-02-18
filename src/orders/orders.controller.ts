import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Body() customer: Customer, @Body() products: Product[]) {

    try{
      const order = await this.ordersService.create(customer, products, true);
      return { success: true, order};
    }catch(error){
        return { success: false, error: error.message};
    }
    // return this.ordersService.create(createOrderDto);
  }

  @Post(':id/add-product')
  @UseGuards(AuthGuard)
  async addProductToOrder(@Param('id') orderId: number, @Body() product: Product) {
    try{
      const order = await this.ordersService.addProductToOrder(orderId, product);
      return { success: true, order};

    }catch(error){

      return {success: false, error: error.message};

    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeOrder(@Param('id') orderId: number) {
    try{
      const result = await this.ordersService.remove(orderId);
      if( result.affected === 0) {
        throw new NotFoundException("Order does not exist")
      }
      return { success: true, message: 'Order has been removed successfully'};

    }catch(error){
      return { success: false, error: error.message};

    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id') orderId: number) {
    try {
      const order = this.ordersService.findOne(orderId);
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }
      return { success: true, order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }


  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
