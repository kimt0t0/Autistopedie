import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from '../data/schemas/data.schema';
import { IllustrationController } from './illustration.controller';
import { IllustrationService } from './illustration.service';
import { Illustration, IllustrationSchema } from './schemas/illustration.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Illustration.name, schema: IllustrationSchema },
            { name: Data.name, schema: DataSchema },
        ]),
    ],
    controllers: [IllustrationController],
    providers: [IllustrationService],
})
export class IllustrationModule {}
