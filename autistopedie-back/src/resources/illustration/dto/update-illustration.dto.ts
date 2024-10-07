import { IsString, Length } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateIllustrationDto {
    @IsString()
    @Length(24)
    dataId: string | ObjectId;
}
