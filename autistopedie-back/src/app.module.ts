import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { AuthModule } from './resources/auth/auth.module';
import { DataModule } from './resources/data/data.module';
import { IllustrationModule } from './resources/illustration/illustration.module';
import { User, UserSchema } from './resources/user/schemas/user.schema';
import { UserModule } from './resources/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
            cache: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../'),
            renderPath: '/public/data-illustrations',
        }),
        MongooseModule.forRoot(process.env.DB_URL, {
            dbName: process.env.DB_NAME,
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000, //milliseconds 60000 = 1min
                limit: 15, // number of requests allowed per user on all guarded routes
            },
        ]),
        // import api resources
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule,
        UserModule,
        DataModule,
        IllustrationModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // global guard
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        // roles guard
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
