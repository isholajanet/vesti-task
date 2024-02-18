import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Product } from 'src/products/entities/product.entity';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {

    
  }

  @Post()
    checkout (@Body() body: { transactionId: number, orderId: number }){

      const { transactionId, orderId } = body;

      try {
        return this.stripeService.checkout(transactionId, orderId);

        

      } catch (error) {
          return error;
      }
    }

    @Post('/payout')
    payout (@Body() body: { transactionId: number, orderId: number}){

      const { transactionId, orderId } = body;
      try {
        return this.stripeService.payout(transactionId, orderId);

      } catch (error) {
          return error;
      }
    }
}
