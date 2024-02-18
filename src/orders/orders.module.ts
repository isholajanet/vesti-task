import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import Stripe from 'stripe';
import { StripeService } from 'src/stripe/stripe.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Transaction, Customer, Product]),
            AuthModule],
  controllers: [OrdersController],
  providers: [OrdersService, StripeService],
})
export class OrdersModule {}
