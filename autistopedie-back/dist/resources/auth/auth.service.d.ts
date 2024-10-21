import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<User>);
    login(loginAuthDto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
}
