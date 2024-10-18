import type { IDataPage } from './IDataPage.interface.js';

export interface IIllustration {
    _id: string; 
    filename: string;
    filepath: string;
    dataIllustrated: IDataPage;
    createdAt?: Date;
    updatedAd?: Date;
}