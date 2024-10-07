import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('datas')
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Post()
    create(@Body() createDataDto: CreateDataDto) {
        return this.dataService.create(createDataDto);
    }

    @Get()
    findAll() {
        return this.dataService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dataService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDataDto: UpdateDataDto) {
        return this.dataService.update(+id, updateDataDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.dataService.remove(+id);
    }
}
