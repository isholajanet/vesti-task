import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,

  ) {}
  async signUp(createCustomerDto: CreateCustomerDto): Promise<{token: string}>{

    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);

    createCustomerDto.password = hashedPassword;

    const customer = await this.customerRepository.save(createCustomerDto);
    
    const token = this.jwtService.sign({id: customer.customerId});

    return { token };
  
  }

  async login(loginDto: LoginDto): Promise<{message: string; token : string}>{

    const { email, password } = loginDto;

    const customer = this.customerRepository.findOne({ where: {email}});

    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, (await customer).password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign( { id: (await customer).customerId});

    return { message: 'User logged in successfully',token };

  }

}
