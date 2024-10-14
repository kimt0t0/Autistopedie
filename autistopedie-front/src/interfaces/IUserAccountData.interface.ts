import type { Role } from "@/enums/Role.enum";
import type { IDataPage } from "./IDataPage.interface";

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