import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { DataPage } from 'src/resources/data/schemas/datapage.schema';
import { Role } from '../enums/role.enum';
export declare class User {
    _id: ObjectId;
    username: string;
    email: string;
    hash: string;
    role: Role;
    addedData: DataPage[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & Required<{
    _id: ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & Required<{
    _id: ObjectId;
}> & {
    __v?: number;
}>;
