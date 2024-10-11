import type { Category } from '@/enums/Category.enum';
import type { UUID } from 'crypto';
import type { IIllustration } from './IIllustration.interface';
import type { IUserAuthData } from './IUserAuthData.interface';

export interface IDataPage {
    _id: UUID; 
    title: string;
    summary?: string;
    contents?: object;
    authors: string;
    categories: Category[];
    illustration?: IIllustration;
    dataAuthor: IUserAuthData;
}