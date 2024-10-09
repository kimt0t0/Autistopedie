import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '../user/enums/role.enum';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { IllustrationService } from './illustration.service';

@Controller('illustrations')
export class IllustrationController {
    constructor(private readonly illustrationService: IllustrationService) {}

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Post()
    @UseInterceptors(FileInterceptor('illustration'))
    create(
        @Body() createIllustrationDto: CreateIllustrationDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: '.(png|jpeg|jpg|wepb|gif)',
                })
                .addMaxSizeValidator({
                    maxSize: 32000000,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    fileIsRequired: true,
                }),
        )
        illustration: Express.Multer.File,
    ) {
        return this.illustrationService.create(createIllustrationDto, illustration);
    }

    @Roles(Role.ADMIN)
    @Get()
    findAll() {
        return this.illustrationService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: ObjectId | string) {
        return this.illustrationService.findOne(new ObjectId(id));
    }

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Delete(':id')
    remove(@Param('id') id: ObjectId | string) {
        return this.illustrationService.remove(new ObjectId(id));
    }
}
