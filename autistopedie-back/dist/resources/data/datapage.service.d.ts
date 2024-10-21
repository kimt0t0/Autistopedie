import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { CreateDataPageDto } from './dto/create-datapage.dto';
import { RemoveDataPageDto } from './dto/remove-datapage.dto';
import { UpdateDataPageDto } from './dto/update-datapage.dto';
import { DataPage } from './schemas/datapage.schema';
export declare class DataPageService {
    private request;
    private userModel;
    private dataPageModel;
    constructor(request: any, userModel: Model<User>, dataPageModel: Model<DataPage>);
    create(createDataDto: CreateDataPageDto): Promise<DataPage>;
    findAll(): Promise<DataPage[]>;
    findOne(id: ObjectId): Promise<DataPage>;
    update(id: ObjectId, updateDataDto: UpdateDataPageDto): Promise<DataPage>;
    remove(id: ObjectId, removeDataDto: RemoveDataPageDto): Promise<DataPage>;
}
