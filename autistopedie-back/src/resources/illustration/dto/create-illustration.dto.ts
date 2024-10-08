import { IsString, Length } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateIllustrationDto {
    @IsString()
    @Length(24)
    dataId: string | ObjectId;
}
