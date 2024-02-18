import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly stripService: StripeService,

  
    
  ){}

  async create(customer: Customer, products: Product[], processPayment: boolean = true): Promise<Order> {

    const newOrder = new Order();

    newOrder.customer = customer;
    newOrder.products = products;
    newOrder.order_total = this.calculateOrderTotal(products);
    newOrder.order_status = OrderStatus.PENDING;
    newOrder.createdAt = new Date();

    let order;

    try{
      order = await this.orderRepository.save(newOrder);

      if(processPayment) {
        let retrycount = 3;
        let paymentSuccess = false;

        while(retrycount > 0 && !paymentSuccess){
          try {

            await this.stripService.checkout(customer.customerId, order.id);
            paymentSuccess = true;

          }catch(error){
            retrycount--;

          }
        }

        if (!paymentSuccess) {

          order.order_status = OrderStatus.PENDING;
          await this.orderRepository.save(order);
          throw new Error('Payment failed after multiple retries');
        }
      }


    }catch(error){

      throw error;

    }

   


    return order;


  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({ where: {id}});
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }

  async addProductToOrder(id: number, product: Product): Promise<Order> {

    const order = await this.orderRepository.findOne({where: { id }});
    order.products.push(product);
    return this.orderRepository.save(order);
  }

  async getOrdersByCustomer(customer: Customer): Promise<Order[]> {
    return this.orderRepository.find({where: { customer }, relations: ['products']})
  }

 

  private calculateOrderTotal(products: Product[]): number {
    return products.reduce((total, product) => total + product.price, 0);
  }


 
}
