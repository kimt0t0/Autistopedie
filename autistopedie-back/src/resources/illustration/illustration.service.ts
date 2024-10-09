import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IDecodedToken } from 'src/interfaces/IDecodedToken';
import { decodeToken } from 'src/utils/token.util';
import { DataPage } from '../data/schemas/datapage.schema';
import { Role } from '../user/enums/role.enum';
import { User } from '../user/schemas/user.schema';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { Illustration } from './schemas/illustration.schema';
const fs = require('fs');

@Injectable()
export class IllustrationService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(Illustration.name)
        private illustrationModel: Model<Illustration>,
        @InjectModel(DataPage.name)
        private dataModel: Model<DataPage>,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async create(createIllustrationDto: CreateIllustrationDto, illustration: Express.Multer.File) {
        try {
            const { dataId } = createIllustrationDto;
            // get related data page
            try {
                const data: DataPage = await this.dataModel
                    .findById(new ObjectId(dataId))
                    .populate('illustration')
                    .exec();
                // if data page already has an illustration, remove it
                if (data.illustration) {
                    console.log(`Former illustration: ${data.illustration.filename}`);
                    await this.remove(new ObjectId(data.illustration._id));
                }
            } catch (e) {
                console.error(
                    `Former illustration could not be found due to error with code ${e.code}: ${e.message}`,
                );
            }
            // save new illustration
            const filename: string = illustration.filename;
            const filepath: string = illustration.path;
            const newIllustration = new this.illustrationModel({
                dataIllustrated: new ObjectId(dataId),
                filename,
                filepath,
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

    async findAll() {
        try {
            const illustrations: Illustration[] = await this.illustrationModel.find();
            return illustrations;
        } catch (e) {
            console.error(
                `Illustrations could not be loaded due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async findOne(id: ObjectId) {
        try {
            const illustration: Illustration = await this.illustrationModel.findById(id).exec();
            return illustration;
        } catch (e) {
            console.error(
                `Illustration with id ${id} could not be loaded due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async remove(id: ObjectId) {
        try {
            // check authenticated user
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser: User = await this.userModel
                .findById(new ObjectId(decodedToken._id))
                .select('email')
                .select('hash')
                .select('role')
                .exec();
            // (check role)
            if (authenticatedUser.role != Role.ADMIN && authenticatedUser.role != Role.CONTRIBUTOR)
                throw new UnauthorizedException(
                    `An illustration can be removed only by a contributor or admin account.`,
                );
            // delete illustration from database
            const deletedIllustration: Illustration = await this.illustrationModel
                .findByIdAndDelete(id)
                .select('_id')
                .select('filename')
                .select('filepath')
                .exec();
            if (!deletedIllustration)
                throw new NotFoundException(`Illustration with id ${id} was not found.`);
            // delete illustration from server
            fs.unlinkSync(deletedIllustration.filepath);
            return deletedIllustration;
        } catch (e) {
            console.error(
                `Illustration with id ${id} could not be removed due to error with code ${e.code}: ${e.message}`,
            );
        }
    }
}
