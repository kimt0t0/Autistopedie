import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from '../data/schemas/data.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Data.name, schema: DataSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
