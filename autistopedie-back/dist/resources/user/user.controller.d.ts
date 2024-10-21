import { ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findAllPublic(): Promise<User[]>;
    findOne(id: ObjectId | string): Promise<User>;
    findOnePublic(id: ObjectId | string): Promise<User>;
    update(id: ObjectId | string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: ObjectId | string, removeUserDto: RemoveUserDto): Promise<User>;
}
