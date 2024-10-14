import type { Role } from "@/enums/Role.enum";

export interface IUserAccountData {
    username: string;
    email?: string;
    newEmail?: string;
    password?: string;
    newPassword?: string;
    role?: Role;
}