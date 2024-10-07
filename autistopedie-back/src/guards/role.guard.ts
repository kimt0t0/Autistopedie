import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Role } from 'src/resources/user/enums/role.enum';
import { decodeToken } from 'src/utils/token.util';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
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
        const decodedToken = decodeToken(token);
        return requiredRoles.some((role) => decodedToken.role === role);
    }
}
