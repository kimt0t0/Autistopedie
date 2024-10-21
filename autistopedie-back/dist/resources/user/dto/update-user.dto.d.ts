import { Role } from '../enums/role.enum';
export declare class UpdateUserDto {
    email: string;
    password: string;
    username: string;
    newEmail: string;
    newPassword: string;
    role: Role;
}
