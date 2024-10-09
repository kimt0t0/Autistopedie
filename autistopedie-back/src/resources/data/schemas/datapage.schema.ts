import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Illustration } from 'src/resources/illustration/schemas/illustration.schema';
import { User } from 'src/resources/user/schemas/user.schema';
import { Categorie } from '../enums/categorie.enum';

@Schema({ timestamps: true })
export class DataPage {
    @Prop({
        type: ObjectId,
        default: () => new ObjectId(),
    })
    _id: ObjectId;

    @Prop({ length: 255, nullable: false, unique: true })
    title: string;

    @Prop({ length: 500, nullable: true })
    summary: string;

    // JSON content not directly recognised by Mongoose and @Prop() decorator
    @Prop({ type: mongoose.Schema.Types.Mixed, nullable: true })
    contents: object;

    @Prop({ length: 500, nullable: false })
    authors: string;

    @Prop({ nullable: false, default: [Categorie.OTHER] })
    categories: Categorie[];

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'Illustration' })
    illustration: Illustration;

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
    dataAuthor: User;
}

export const DataPageSchema = SchemaFactory.createForClass(DataPage);
