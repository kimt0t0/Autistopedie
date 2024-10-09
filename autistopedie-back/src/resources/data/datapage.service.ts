import { Inject, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IDecodedToken } from 'src/interfaces/IDecodedToken';
import { decodeToken } from 'src/utils/token.util';
import { Illustration } from '../illustration/schemas/illustration.schema';
import { Role } from '../user/enums/role.enum';
import { User } from '../user/schemas/user.schema';
import { CreateDataPageDto } from './dto/create-datapage.dto';
import { RemoveDataPageDto } from './dto/remove-datapage.dto';
import { UpdateDataPageDto } from './dto/update-datapage.dto';
import { DataPage } from './schemas/datapage.schema';

@Injectable()
export class DataPageService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(DataPage.name)
        private dataPageModel: Model<DataPage>,
        @InjectModel(Illustration.name)
        private illustrationModel: Model<DataPage>,
    ) {}

    async create(createDataDto: CreateDataPageDto): Promise<DataPage> {
        try {
            // check authenticated user is allowed to create data
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser: User = await this.userModel
                .findById(new ObjectId(decodedToken._id))
                .select('_id')
                .select('role')
                .exec();
            if (authenticatedUser.role != Role.ADMIN && authenticatedUser.role != Role.CONTRIBUTOR)
                throw new UnauthorizedException(
                    'You cannot create new data without an admin or contributor account.',
                );
            // save new data
            const newData = new this.dataPageModel(createDataDto);
            newData.dataAuthor = authenticatedUser;
            const createdData = await newData.save();
            // add data author
            try {
                await this.userModel.findByIdAndUpdate(new ObjectId(authenticatedUser._id), {
                    addedData: createdData,
                });
            } catch (e) {
                console.error(
                    `New data could not be related to user account with id ${authenticatedUser._id} due to error with code ${e.code}: ${e.message}`,
                );
            }
            return await this.dataPageModel
                .findById(createdData._id)
                .populate('dataAuthor')
                .populate('illustration')
                .exec();
        } catch (e) {
            console.error(
                `Data could not be created due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async findAll(): Promise<DataPage[]> {
        try {
            const data: DataPage[] = await this.dataPageModel
                .find()
                .populate('illustration')
                .populate('dataAuthor')
                .exec();
            return data;
        } catch (e) {
            console.error(
                `Data could not be loaded due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async findOne(id: ObjectId): Promise<DataPage> {
        try {
            const data: DataPage = await this.dataPageModel
                .findById(id)
                .populate('illustration')
                .populate('dataAuthor')
                .exec();
            return data;
        } catch (e) {
            console.error(
                `Single data page could not be loaded due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async update(id: ObjectId, updateDataDto: UpdateDataPageDto): Promise<DataPage> {
        try {
            // check authenticated user is allowed to create data
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser = await this.userModel
                .findById(new ObjectId(decodedToken._id))
                .select('_id')
                .select('role')
                .exec();
            if (authenticatedUser.role != Role.ADMIN && authenticatedUser.role != Role.CONTRIBUTOR)
                throw new UnauthorizedException(
                    'You cannot update new data without an admin or contributor account.',
                );
            // save new data
            await this.dataPageModel.findByIdAndUpdate(id, { ...updateDataDto });
            const updatedData: DataPage = await this.dataPageModel
                .findById(id)
                .populate('illustration')
                .populate('dataAuthor')
                .exec();
            return await this.dataPageModel
                .findById(updatedData._id)
                .populate('dataAuthor')
                .populate('illustration')
                .exec();
        } catch (e) {
            console.error(
                `Data with id ${id} could not be updated due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async remove(id: ObjectId, removeDataDto: RemoveDataPageDto): Promise<DataPage> {
        try {
            const { email, password } = removeDataDto;
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
            const dataPage: DataPage = await this.dataPageModel
                .findById(new ObjectId(id))
                .populate('dataAuthor')
                .exec();
            if (
                authenticatedUser.role != Role.ADMIN &&
                authenticatedUser._id.toString() != dataPage.dataAuthor._id.toString()
            )
                throw new UnauthorizedException(
                    `A datapage can be removed only by its owner or an admin account.`,
                );
            const isPasswordMatch = bcrypt.compare(authenticatedUser.hash, password);
            if (!isPasswordMatch) throw new NotAcceptableException(`User password is incorrect.`);
            if (email != authenticatedUser.email)
                throw new NotAcceptableException(`User email is incorrect.`);
            // delete datapage
            const deletedData: DataPage = await this.dataPageModel
                .findByIdAndDelete(id)
                .select('_id')
                .select('title')
                .exec();
            return deletedData;
        } catch (e) {
            console.error(
                `Data with id ${id} could not be removed due to error with code ${e.code}: ${e.message}`,
            );
        }
    }
}
