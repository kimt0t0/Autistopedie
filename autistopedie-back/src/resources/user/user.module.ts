import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataPage, DataPageSchema } from '../data/schemas/datapage.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: DataPage.name, schema: DataPageSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
