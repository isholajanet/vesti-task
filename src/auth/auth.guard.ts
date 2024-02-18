import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ){}

    canActivate(context: ExecutionContext): boolean  | Promise<boolean> | Observable<boolean>{
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;


        if (request.url === '/auth/login') {
            return true;
        }
        if ( !authHeader || !authHeader.startsWith('Bearer ')) {
            return false;
        }

        const token = authHeader.split(' ')[1];

        try {

            const decoded = this.jwtService.verify(token);

            request.user = decoded;

        } catch(error){
            return false;
        }
    }
}