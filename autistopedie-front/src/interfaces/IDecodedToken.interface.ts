import type { Role } from "@/enums/Role.enum";
import type { UUID } from 'crypto';

export interface IDecodedToken {
    _id: UUID;
    username: string;
    role: Role
}