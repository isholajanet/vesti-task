import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() createAuthDto: CreateCustomerDto): Promise< { token }> {
    return this.authService.signUp(createAuthDto);
  }


  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ message: string, token: string }> {
    try {
      const response =  this.authService.login(loginDto);
      return response;
    } catch (error) {
      // Handle login error
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }


 }
