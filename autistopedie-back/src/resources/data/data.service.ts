import { Injectable } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Injectable()
export class DataService {
    create(createDataDto: CreateDataDto) {
        return 'This action adds a new Data';
    }

    findAll() {
        return `This action returns all data`;
    }

    findOne(id: number) {
        return `This action returns a #${id} Data`;
    }

    update(id: number, updateDataDto: UpdateDataDto) {
        return `This action updates a #${id} Data`;
    }

    remove(id: number) {
        return `This action removes a #${id} Data`;
    }
}
