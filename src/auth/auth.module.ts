import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Auth } from './entities/auth.entity';
import { AuthGuard } from './auth.guard';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        console.log('JWT Secret:', secret);
        return {
          secret,
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, { provide: AuthGuard, useClass: AuthGuard }, JwtService],
  exports: [JwtStrategy, PassportModule, AuthGuard, JwtService],
})
export class AuthModule {}
