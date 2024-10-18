import type { IDataPage } from './IDataPage.interface.js';

export interface IUserAuthData {
    _id: string;
    username: string;
    addedData?: IDataPage[];
}