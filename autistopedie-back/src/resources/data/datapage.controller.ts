import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '../user/enums/role.enum';
import { DataPageService } from './datapage.service';
import { CreateDataPageDto } from './dto/create-datapage.dto';
import { RemoveDataPageDto } from './dto/remove-datapage.dto';
import { UpdateDataPageDto } from './dto/update-datapage.dto';

@Controller('datapages')
export class DataPageController {
    constructor(private readonly dataPageService: DataPageService) {}

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Post()
    create(@Body() createDataDto: CreateDataPageDto) {
        return this.dataPageService.create(createDataDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.dataPageService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: ObjectId | string) {
        return this.dataPageService.findOne(new ObjectId(id));
    }

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Patch(':id')
    update(@Param('id') id: ObjectId | string, @Body() updateDataDto: UpdateDataPageDto) {
        return this.dataPageService.update(new ObjectId(id), updateDataDto);
    }

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Delete(':id')
    remove(@Param('id') id: ObjectId | string, @Body() removeDataDto: RemoveDataPageDto) {
        return this.dataPageService.remove(new ObjectId(id), removeDataDto);
    }
}
