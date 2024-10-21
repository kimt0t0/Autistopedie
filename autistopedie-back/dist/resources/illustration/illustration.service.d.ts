import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { DataPage } from '../data/schemas/datapage.schema';
import { User } from '../user/schemas/user.schema';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { Illustration } from './schemas/illustration.schema';
export declare class IllustrationService {
    private request;
    private illustrationModel;
    private dataModel;
    private userModel;
    constructor(request: any, illustrationModel: Model<Illustration>, dataModel: Model<DataPage>, userModel: Model<User>);
    create(createIllustrationDto: CreateIllustrationDto, illustration: Express.Multer.File): Promise<Illustration>;
    findAll(): Promise<Illustration[]>;
    findOne(id: ObjectId): Promise<Illustration>;
    remove(id: ObjectId): Promise<Illustration>;
}
