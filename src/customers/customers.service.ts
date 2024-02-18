import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) 
    private readonly customerRepository: Repository<Customer>) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {

    const emailExists = await this.checkDuplicateEmail(createCustomerDto.email);
    const usernameExists = await this.checkDuplicateUsername(createCustomerDto.username);

    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    if(usernameExists){
      throw new HttpException('Username already exist, kindly choose a different username', HttpStatus.BAD_REQUEST);
    }

    const customer = this.customerRepository.save(createCustomerDto);

    return customer;

  }

  async findUserWithEmail(email: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne( { where: { email }})

    if (customer ){

      return customer;
    }
      throw new NotFoundException('Could not find the customer');
    
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findUserById(customerId: number): Promise<Customer> {
    const customer = this.customerRepository.findOne( { where: {customerId}});

    if(customer){
      return customer;
    }

    throw new NotFoundException('Could not find customer');
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(customerId: number): Promise<void> {

    const customer = this.customerRepository.findOne( { where: {customerId}});

    if (!customer) {
        return null;
    }
    await this.customerRepository.delete( customerId );
  }

  async checkDuplicateEmail(email: string): Promise<Boolean>{
      const customer = await this.customerRepository.findOne( { where: { email } });

      if (customer != null) {
        return true;
      } else {
        return false;
      }
  }

  async checkDuplicateUsername(username: string): Promise<Boolean> {
    const customer = await this.customerRepository.findOne( { where: { username } });

    if (customer != null){
      return true;
    } else {
      return false;
    }
  }
}
