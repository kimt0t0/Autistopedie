import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(loginAuthDto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
}
