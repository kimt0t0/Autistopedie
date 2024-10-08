import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Data } from '../data/schemas/data.schema';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { Illustration } from './schemas/illustration.schema';

@Injectable()
export class IllustrationService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(Illustration.name)
        private illustrationModel: Model<Illustration>,
        @InjectModel(Data.name)
        private dataModel: Model<Data>,
    ) {}

    async create(createIllustrationDto: CreateIllustrationDto, illustration: Express.Multer.File) {
        try {
            const { dataId } = createIllustrationDto;
            // get related data page
            try {
                const data = await this.dataModel.findById(dataId).populate('illustration').exec();
                if (data.illustration) await this.remove(new ObjectId(data.illustration._id));
            } catch (e) {
                console.error(
                    `Data with id ${dataId} could not be found due to error with code ${e.code}: ${e.message}`,
                );
            }
            // save new illustration
            const name: string = illustration.filename;
            const path: string = illustration.path;
            const newIllustration = new this.illustrationModel({
                dataIllustrated: new ObjectId(dataId),
                name,
                path,
            });
            const createdIllustration: Illustration = await newIllustration.save();
            // add new illustration reference to data page
            try {
                await this.dataModel
                    .findByIdAndUpdate(new ObjectId(dataId), { illustration: createdIllustration })
                    .exec();
            } catch (e) {
                console.error(
                    `New illustration with id ${createdIllustration._id} could not be added to data page with id ${dataId} due to error with code ${e.code}: ${e.message}`,
                );
            }
            // return created illustration
            return createdIllustration;
        } catch (e) {
            console.error(
                `New illustration could not be saved due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    findAll() {
        return `This action returns all illustration`;
    }

    findOne(id: ObjectId) {
        return `This action returns a #${id} illustration`;
    }

    remove(id: ObjectId) {
        return `This action removes a #${id} illustration`;
    }
}
