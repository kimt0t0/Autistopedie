import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { DataPage } from 'src/resources/data/schemas/datapage.schema';
export declare class Illustration {
    _id: ObjectId;
    filename: string;
    filepath: string;
    dataIllustrated: DataPage;
}
export declare const IllustrationSchema: mongoose.Schema<Illustration, mongoose.Model<Illustration, any, any, any, mongoose.Document<unknown, any, Illustration> & Illustration & Required<{
    _id: ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Illustration, mongoose.Document<unknown, {}, mongoose.FlatRecord<Illustration>> & mongoose.FlatRecord<Illustration> & Required<{
    _id: ObjectId;
}> & {
    __v?: number;
}>;
