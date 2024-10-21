import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Illustration } from 'src/resources/illustration/schemas/illustration.schema';
import { User } from 'src/resources/user/schemas/user.schema';
import { Category } from '../enums/category.enum';
export declare class DataPage {
    _id: ObjectId;
    title: string;
    summary: string;
    contents: object;
    authors: string;
    categories: Category[];
    illustration: Illustration;
    dataAuthor: User;
}
export declare const DataPageSchema: mongoose.Schema<DataPage, mongoose.Model<DataPage, any, any, any, mongoose.Document<unknown, any, DataPage> & DataPage & Required<{
    _id: ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, DataPage, mongoose.Document<unknown, {}, mongoose.FlatRecord<DataPage>> & mongoose.FlatRecord<DataPage> & Required<{
    _id: ObjectId;
}> & {
    __v?: number;
}>;
