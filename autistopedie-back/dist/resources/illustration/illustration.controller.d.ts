import { ObjectId } from 'mongodb';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { IllustrationService } from './illustration.service';
export declare class IllustrationController {
    private readonly illustrationService;
    constructor(illustrationService: IllustrationService);
    create(createIllustrationDto: CreateIllustrationDto, illustration: Express.Multer.File): Promise<import("./schemas/illustration.schema").Illustration>;
    findAll(): Promise<import("./schemas/illustration.schema").Illustration[]>;
    findOne(id: ObjectId | string): Promise<import("./schemas/illustration.schema").Illustration>;
    remove(id: ObjectId | string): Promise<import("./schemas/illustration.schema").Illustration>;
}
