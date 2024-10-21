import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Model } from 'mongoose';
import { User } from 'src/resources/user/schemas/user.schema';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userModel;
    constructor(reflector: Reflector, userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
