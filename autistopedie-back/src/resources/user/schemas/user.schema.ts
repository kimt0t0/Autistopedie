import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { DataPage } from 'src/resources/data/schemas/datapage.schema';
import { Role } from '../enums/role.enum';

@Schema({ timestamps: true })
export class User {
    @Prop({
        type: ObjectId,
        default: () => new ObjectId(),
    })
    _id: ObjectId;

    @Prop({ length: 80, nullable: false, unique: true })
    username: string;

    @Prop({ length: 120, nullable: false, unique: true })
    email: string;

    @Prop({ nullable: false })
    hash: string;

    @Prop({ default: Role.READER }) // wait for admin action to validate and turn into contributor
    role: Role;

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'DataPage' })
    addedData: DataPage[];
}

export const UserSchema = SchemaFactory.createForClass(User);
