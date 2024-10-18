import type { Role } from "@/enums/Role.enum.js";
import type { IDataPage } from "./IDataPage.interface.js";

export interface IUserAccountData {
    username: string;
    email?: string;
    newEmail?: string;
    password?: string;
    newPassword?: string;
    role?: Role;
    addedData?: IDataPage[];
    createdAt?: Date;
    updatedAd?: Date;
}