import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Data } from 'src/resources/data/schemas/data.schema';

@Schema({ timestamps: true })
export class Illustration {
    @Prop({
        type: ObjectId,
        default: () => new ObjectId(),
    })
    _id: ObjectId;

    @Prop({ length: 80, nullable: false })
    filename: string;

    @Prop({ length: 256, nullable: false })
    filepath: string;

    @Prop({ type: mongoose.Schema.ObjectId, ref: 'Data' })
    dataIllustrated: Data;
}

export const IllustrationSchema = SchemaFactory.createForClass(Illustration);
