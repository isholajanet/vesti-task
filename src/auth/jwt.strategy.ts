import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { use } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Customer } from "src/customers/entities/customer.entity";
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload) {

        const { customerId } = payload;
        
        const customer = await this.customerRepository.findOne({where: {customerId}});

        if (!customer) {
            throw new UnauthorizedException("Kindly log in");
        }

        return use;

    }

}