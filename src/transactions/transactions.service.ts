import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private  transactionRepository: Repository<Transaction>
  ){}
  async create(createTransactionDto: CreateTransactionDto) {

    const customerId = createTransactionDto.customerId;

    const userExists = await this.transactionRepository.findOne({where: { customerId }});

    if (!userExists){
      throw new NotFoundException('User does not exist');
    }

    const transaction = await this.transactionRepository.save(createTransactionDto);
    return transaction;
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({where: {id}});
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }


  async findAll(): Promise<Transaction[]> {

    return await this.transactionRepository.find();
  
   
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
