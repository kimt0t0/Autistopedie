import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Data, DataSchema } from '../data/schemas/data.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { IllustrationController } from './illustration.controller';
import { IllustrationService } from './illustration.service';
import { Illustration, IllustrationSchema } from './schemas/illustration.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Illustration.name, schema: IllustrationSchema },
            { name: Data.name, schema: DataSchema },
            { name: User.name, schema: UserSchema },
        ]),
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    destination: './public/data-illustrations',
                    filename: (req, illustration, callback) => {
                        const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1e4);
                        callback(null, uniquePrefix + illustration.originalname);
                    },
                }),
            }),
        }),
    ],
    controllers: [IllustrationController],
    providers: [IllustrationService],
})
export class IllustrationModule {}
