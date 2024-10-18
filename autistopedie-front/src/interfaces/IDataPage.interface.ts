import type { Category } from '@/enums/Category.enum.js';
import type { Delta } from '@vueup/vue-quill';
import type { IIllustration } from './IIllustration.interface.js';
import type { IUserAccountData } from './IUserAccountData.interface.js';

export interface IDataPage {
    _id?: string; 
    title: string;
    summary?: string;
    contents?: Delta | string | null;
    authors?: string;
    categories: Category[];
    illustration?: IIllustration;
    dataAuthor: IUserAccountData | undefined;
    createdAt?: Date;
    updatedAt?: Date;
}