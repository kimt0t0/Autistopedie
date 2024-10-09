import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Illustration, IllustrationSchema } from '../illustration/schemas/illustration.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DataPageController } from './datapage.controller';
import { DataPageService } from './datapage.service';
import { DataPage, DataPageSchema } from './schemas/datapage.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DataPage.name, schema: DataPageSchema },
            { name: User.name, schema: UserSchema },
            { name: Illustration.name, schema: IllustrationSchema },
        ]),
    ],
    controllers: [DataPageController],
    providers: [DataPageService],
})
export class DataPageModule {}
