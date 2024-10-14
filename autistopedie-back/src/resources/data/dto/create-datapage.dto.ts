import { Transform } from 'class-transformer';
import { IsArray, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Categorie } from '../enums/categorie.enum';

export class CreateDataPageDto {
    @IsString()
    @Length(3, 255)
    title: string;

    @IsString()
    @Length(0, 500)
    @IsOptional()
    summary: string;

    @IsObject()
    @Transform(({ value }) => {
        try {
            return JSON.parse(value);
        } catch (error) {
            throw new Error('Invalid JSON format for contents');
        }
    })
    @IsOptional()
    contents: object;

    @IsString()
    @Length(0, 500)
    @IsOptional()
    authors: string;

    @IsArray()
    @IsOptional()
    categories: Categorie[];

    @IsString()
    @Length(24)
    @IsOptional()
    illustrationId: string | ObjectId;
}
