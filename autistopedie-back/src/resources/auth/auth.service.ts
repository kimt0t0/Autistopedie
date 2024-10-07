import {
    Injectable,
    NotAcceptableException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async login(loginAuthDto: LoginAuthDto) {
        const { username, password } = loginAuthDto;
        if (!username) throw new NotAcceptableException(`User must enter a username.`);
        if (!password) throw new NotAcceptableException(`User must enter a password.`);
        try {
            // check if user exists
            const user = await this.userModel.findOne({ username }).select('-email').select('-id');
            if (!user) throw new NotFoundException(`User with username ${username} was not found.`);
            // check password
            const isMatch = await bcrypt.compare(password, user.hash);
            if (!isMatch) throw new UnauthorizedException(`User password is incorrect.`);
            // generate and return authentication token
            const payload = { _id: user._id, username: user.username, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (e) {
            throw new Error(`Could not login user with username ${username}: ${e}`);
        }
    }
}
