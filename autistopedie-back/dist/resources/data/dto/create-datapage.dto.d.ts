import { ObjectId } from 'mongodb';
import { Category } from '../enums/category.enum';
export declare class CreateDataPageDto {
    title: string;
    summary: string;
    contents: object;
    authors: string;
    categories: Category[];
    illustrationId: string | ObjectId;
}
