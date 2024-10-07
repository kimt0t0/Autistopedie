import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Illustration, IllustrationSchema } from '../illustration/schemas/illustration.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { Data, DataSchema } from './schemas/data.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Data.name, schema: DataSchema },
            { name: User.name, schema: UserSchema },
            { name: Illustration.name, schema: IllustrationSchema },
        ]),
    ],
    controllers: [DataController],
    providers: [DataService],
})
export class DataModule {}
