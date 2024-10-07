import { Inject, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IDecodedToken } from 'src/interfaces/IDecodedToken';
import { decodeToken } from 'src/utils/token.util';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const { username, email, password, role } = createUserDto;
            if (role == Role.ADMIN || role == Role.CONTRIBUTOR)
                throw new NotAcceptableException(
                    'You cannot create an admin or contributor account on your own. Please contact the administrator of the website if you wish to contribute.',
                );
            const hash = await bcrypt.hash(password, 15);
            const userData = {
                username,
                email,
                hash,
                role,
            };
            const newUser = new this.userModel(userData);
            const createdUser = await newUser.save();
            delete createdUser.email;
            delete createdUser.hash;
            return createdUser;
        } catch (e) {
            console.error(
                `User could not be created due to error with code ${e.code}:  ${e.message}`,
            );
        }
    }

    async findAll(): Promise<Array<User>> {
        try {
            const users = await this.userModel
                .find()
                .select('-hash')
                .select('-email')
                .populate('addedData')
                .exec();
            return users;
        } catch (e) {
            console.error(
                `Users could not be loaded due to error with code ${e.code}:  ${e.message}`,
            );
        }
    }

    async findOne(id: ObjectId): Promise<User> {
        try {
            const selectedUser = await this.userModel
                .findById(id)
                .select('-hash')
                .select('-email')
                .populate('addedData')
                .exec();
            if (!selectedUser) throw new NotFoundException(`User with id ${id} was not found !`);
            return selectedUser;
        } catch (e) {
            console.error(
                `User with id ${id} could not be found due to error with code ${e.code}:  ${e.message}`,
            );
        }
    }

    async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            // destructure dto
            const { username, email, newEmail, password, newPassword, role } = updateUserDto;
            // check authenticated user
            const token = this.request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser: User = await this.userModel.findById(new ObjectId(decodedToken._id)).exec();
            if (authenticatedUser.role != Role.ADMIN && authenticatedUser._id.toString() != id.toString()) throw new UnauthorizedException(`A user account can be edited only by its owner or an admin account.`);
            const isPasswordMatch = bcrypt.compare(authenticatedUser.hash, password);
            if (!isPasswordMatch) throw new NotAcceptableException(`User password is incorrect.`);
            if (email != authenticatedUser.email)
                throw new NotAcceptableException(`User email is incorrect.`);
            // if new password update password:
            let updatedHash: string;
            if (newPassword) {
                updatedHash = bcrypt.hash(newPassword, 15);
                await this.userModel.findByIdAndUpdate(id, { hash: updatedHash }).exec();
            }
            // if new email update email:
            if (newEmail) {
                await this.userModel.findByIdAndUpdate(id, { email: newEmail }).exec();
            }
            // todo: for role update check if auth user is admin
            // update other data:
            await this.userModel
                .findByIdAndUpdate(id, {
                    username: username,
                    role: role,
                })
                .exec();
            const updatedUser = await this.userModel.findById(id).exec();
            return updatedUser;
            // return updated user:
        } catch (e) {
            console.error(
                `User with id ${id} could not be updated due to error with code ${e.code}:  ${e.message}`,
            );
        }
    }

    async remove(id: ObjectId, removeUserDto: RemoveUserDto): Promise<User> {
        try {
            const { email, password } = removeUserDto;
            // check authenticated user
            const token = this.request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken: IDecodedToken = decodeToken(token);
            const authenticatedUser = await this.userModel
            .findById(decodedToken._id).select('email').select('password').exec();
            if (authenticatedUser.role != Role.ADMIN && authenticatedUser._id != id) throw new UnauthorizedException(`A user account can be edited only by its owner or an admin account.`);
            const isPasswordMatch = bcrypt.compare(authenticatedUser.hash, password);
            if (!isPasswordMatch) throw new NotAcceptableException(`User password is incorrect.`);
            if (email != authenticatedUser.email)
                throw new NotAcceptableException(`User email is incorrect.`);
            // delete user
            const deletedUser = await this.userModel
                .findByIdAndDelete(id)
                .select('id')
                .select('username')
                .exec();
            return deletedUser;
        } catch (e) {
            console.error(
                `User with id ${id} could not be deleted due to error with code ${e.code}:  ${e.message}`,
            );
        }
    }
}
