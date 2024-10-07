import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Categorie } from '../enums/categorie.enum';

export class CreateDataDto {
    @IsString()
    @Length(3, 255)
    title: string;

    @IsString()
    @Length(0, 500)
    @IsOptional()
    summary: string;

    @IsString()
    @Length(0, 500)
    authors: string;

    @IsArray()
    @IsOptional()
    categories: Categorie[];

    @IsString()
    @Length(24)
    @IsOptional()
    illustrationId: string | ObjectId;

    @IsString()
    @Length(24)
    dataAuthor: string | ObjectId;
}
