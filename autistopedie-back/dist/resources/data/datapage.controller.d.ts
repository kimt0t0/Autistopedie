import { ObjectId } from 'mongodb';
import { DataPageService } from './datapage.service';
import { CreateDataPageDto } from './dto/create-datapage.dto';
import { RemoveDataPageDto } from './dto/remove-datapage.dto';
import { UpdateDataPageDto } from './dto/update-datapage.dto';
export declare class DataPageController {
    private readonly dataPageService;
    constructor(dataPageService: DataPageService);
    create(createDataDto: CreateDataPageDto): Promise<import("./schemas/datapage.schema").DataPage>;
    findAll(): Promise<import("./schemas/datapage.schema").DataPage[]>;
    findOne(id: ObjectId | string): Promise<import("./schemas/datapage.schema").DataPage>;
    update(id: ObjectId | string, updateDataDto: UpdateDataPageDto): Promise<import("./schemas/datapage.schema").DataPage>;
    remove(id: ObjectId | string, removeDataDto: RemoveDataPageDto): Promise<import("./schemas/datapage.schema").DataPage>;
}
