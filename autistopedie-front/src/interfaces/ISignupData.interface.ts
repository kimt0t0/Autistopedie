import type { Role } from "@/enums/Role.enum.js";

export default interface ISignupData {
    username: string;
    email: string;
    password: string;
    role?: Role;
}