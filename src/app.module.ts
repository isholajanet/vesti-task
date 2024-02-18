import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Product } from './products/entities/product.entity';
import { Customer } from './customers/entities/customer.entity';
import { Order } from './orders/entities/order.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from './stripe/stripe.module';


@Module({
  imports: [
    ConfigModule.forRoot({

      isGlobal: true,

    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Product, Customer, Transaction, Order],
        synchronize: true
        
      }),

    }),
    ProductsModule,
    CustomersModule,
    OrdersModule,
    TransactionsModule,
    AuthModule,
    StripeModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
