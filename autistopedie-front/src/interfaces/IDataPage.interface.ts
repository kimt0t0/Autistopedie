import type { Category } from '@/enums/Category.enum';
import type { Delta } from '@vueup/vue-quill';
import type { UUID } from 'crypto';
import type { IIllustration } from './IIllustration.interface';
import type { IUserAccountData } from './IUserAccountData.interface';

export interface IDataPage {
    _id?: UUID; 
    title: string;
    summary?: string;
    contents?: Delta | string | undefined;
    authors?: string;
    categories: Category[];
    illustration?: IIllustration;
    dataAuthor: IUserAccountData | undefined;
    createdAt?: Date;
    updatedAd?: Date;
}