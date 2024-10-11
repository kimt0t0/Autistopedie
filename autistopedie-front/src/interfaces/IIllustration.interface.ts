import type { UUID } from 'crypto';
import type { IDataPage } from './IDataPage.interface';

export interface IIllustration {
    _id: UUID; 
    filename: string;
    filepath: string;
    dataIllustrated: IDataPage;
}