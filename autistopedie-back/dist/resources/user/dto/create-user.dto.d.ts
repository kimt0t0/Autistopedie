import { Role } from '../enums/role.enum';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    role: Role;
}
