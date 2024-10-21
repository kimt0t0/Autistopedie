import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
export declare class UserService {
    private request;
    private userModel;
    constructor(request: any, userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<Array<User>>;
    findAllPublic(): Promise<Array<User>>;
    findOne(id: ObjectId): Promise<User>;
    findOnePublic(id: ObjectId): Promise<User>;
    update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: ObjectId, removeUserDto: RemoveUserDto): Promise<User>;
}
