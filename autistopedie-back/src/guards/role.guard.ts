import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { IDecodedToken } from 'src/interfaces/IDecodedToken';
import { Role } from 'src/resources/user/enums/role.enum';
import { User } from 'src/resources/user/schemas/user.schema';
import { decodeToken } from 'src/utils/token.util';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const datas = context.switchToHttp().getRequest();
        const token = datas.rawHeaders
            .find((header) => header.startsWith('Bearer '))
            .replace('Bearer ', '')
            .replace(' ', '');
        const decodedToken: IDecodedToken = decodeToken(token);
        const authenticatedUser: User = await this.userModel
            .findById(new ObjectId(decodedToken._id))
            .exec();
        return requiredRoles.some((role) => authenticatedUser.role === role);
    }
}
