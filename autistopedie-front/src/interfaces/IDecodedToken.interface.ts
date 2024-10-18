import type { Role } from "@/enums/Role.enum.js";

export interface IDecodedToken {
    _id: string;
    username: string;
    role: Role
}