import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { State } from "../state.enum";

export class CreateCustomerDto {

    @IsString()
    @IsNotEmpty()
    firstname: string;
    
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phonenumber: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    state: State
    

    
}
