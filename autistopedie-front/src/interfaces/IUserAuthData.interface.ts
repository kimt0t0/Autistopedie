import type { UUID } from 'crypto';
import type { IDataPage } from './IDataPage.interface';

export interface IUserAuthData {
    _id: UUID;
    username: string;
    addedData?: IDataPage[];
}