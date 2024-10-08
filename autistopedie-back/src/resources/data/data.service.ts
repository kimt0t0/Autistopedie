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
import { CreateDataDto } from './dto/create-data.dto';
import { RemoveDataDto } from './dto/remove-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';
import { Data } from './schemas/data.schema';

@Injectable()
export class DataService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Data.name)
        private dataModel: Model<Data>,
        @InjectModel(Illustration.name)
        private illustrationModel: Model<Data>,
    ) {}

    async create(createDataDto: CreateDataDto): Promise<Data> {
        try {
            // check authenticated user is allowed to create data
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser = await this.userModel
                .findById(new ObjectId(decodedToken._id))
                .exec();
            if (authenticatedUser.role != (Role.ADMIN || Role.CONTRIBUTOR))
                throw new UnauthorizedException(
                    'You cannot create new data without an admin or contributor account.',
                );
            // save new data
            const newData = new this.dataModel(createDataDto);
            const createdData = await newData.save();
            return createdData;
        } catch (e) {
            console.error(
                `Data could not be created due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async findAll(): Promise<Data[]> {
        try {
            const data = await this.dataModel
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

    async findOne(id: ObjectId): Promise<Data> {
        try {
            const data = await this.dataModel
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

    async update(id: ObjectId, updateDataDto: UpdateDataDto): Promise<Data> {
        try {
            // check authenticated user is allowed to create data
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser = await this.userModel
                .findById(new ObjectId(decodedToken._id))
                .exec();
            if (authenticatedUser.role != (Role.ADMIN || Role.CONTRIBUTOR))
                throw new UnauthorizedException(
                    'You cannot create new data without an admin or contributor account.',
                );
            // save new data
            await this.dataModel.findByIdAndUpdate(id, { ...updateDataDto });
            const updatedData = await this.dataModel
                .findById(id)
                .populate('illustration')
                .populate('dataAuthor')
                .exec();
            return updatedData;
        } catch (e) {
            console.error(
                `Data with id ${id} could not be updated due to error with code ${e.code}: ${e.message}`,
            );
        }
    }

    async remove(id: ObjectId, removeDataDto: RemoveDataDto): Promise<Data> {
        try {
            const { email, password } = removeDataDto;
            // check authenticated user
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser = await this.userModel
                .findById(decodedToken._id)
                .select('email')
                .select('password')
                .exec();
            if (authenticatedUser.role != Role.ADMIN && authenticatedUser._id != id)
                throw new UnauthorizedException(
                    `A user account can be edited only by its owner or an admin account.`,
                );
            const isPasswordMatch = bcrypt.compare(authenticatedUser.hash, password);
            if (!isPasswordMatch) throw new NotAcceptableException(`User password is incorrect.`);
            if (email != authenticatedUser.email)
                throw new NotAcceptableException(`User email is incorrect.`);
            // delete user
            const deletedData = await this.dataModel
                .findByIdAndDelete(id)
                .select('id')
                .select('username')
                .exec();
            return deletedData;
        } catch (e) {
            console.error(
                `Data with id ${id} could not be removed due to error with code ${e.code}: ${e.message}`,
            );
        }
    }
}
