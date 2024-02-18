import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';

@Injectable()
export class StripeService {

    private stripe;

    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>
    ){
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16'
        })
    }

    async checkout(customerId: number, id: number ) {


        const order = await this.orderRepository.findOne({where: {id} });

        if (!order) {
            throw new Error('Order not found');
        }
        
      

        try {
            const amount = order.order_total * 100;
            const transaction = await this.performTransaction(customerId, amount);

            return this.stripe.paymentIntents.create({
                amount: Number(amount) * 100,
                currency: 'usd',
                payment_method_types: ['card'],
                metadata: {
                    transactionId: transaction.id,
                    orderId: order.id,
                }
            });
    } catch (error) {
        throw new Error(`Stripe checkout failed: ${error.message}`);
    }
    }

    async payout(customerId: number, id: number){

        const transaction = await this.transactionRepository.findOne({ where: { customerId } });
        const order = await this.orderRepository.findOne({where: {id}});

        if (!transaction || !order) {
            throw new Error('Transaction or Order not found');
        }

        const totalPrice = order.order_total;

        try {

            return this.stripe.payouts.create({
                amount: Number(totalPrice) * 100,
                currency: 'usd',
                metadata: {
                    transactionId: transaction.id,
                    orderId: order.id,
                }
            })
        } catch (error) {
            throw new Error(`Stripe payout failed: ${error.message}`);
        }
    }

    private async performTransaction(customerId: number, amount: number): Promise<Transaction> {

        const transaction = new Transaction();
        transaction.customerId = customerId;
        transaction.amount = amount;
    
        return await this.transactionRepository.save(transaction);
    
      }
}
