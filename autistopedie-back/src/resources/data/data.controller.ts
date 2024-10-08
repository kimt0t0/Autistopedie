import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '../user/enums/role.enum';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { RemoveDataDto } from './dto/remove-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('datas')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Post()
    create(@Body() createDataDto: CreateDataDto) {
        return this.dataService.create(createDataDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.dataService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: ObjectId | string) {
        return this.dataService.findOne(new ObjectId(id));
    }

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Patch(':id')
    update(@Param('id') id: ObjectId | string, @Body() updateDataDto: UpdateDataDto) {
        return this.dataService.update(new ObjectId(id), updateDataDto);
    }

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Delete(':id')
    remove(@Param('id') id: ObjectId | string, @Body() removeDataDto: RemoveDataDto) {
        return this.dataService.remove(new ObjectId(id), removeDataDto);
    }
}
