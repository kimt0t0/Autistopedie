import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { UpdateIllustrationDto } from './dto/update-illustration.dto';
import { IllustrationService } from './illustration.service';

@Controller('illustrations')
export class IllustrationController {
    constructor(private readonly illustrationService: IllustrationService) {}

    @Post()
    create(@Body() createIllustrationDto: CreateIllustrationDto) {
        return this.illustrationService.create(createIllustrationDto);
    }

    @Get()
    findAll() {
        return this.illustrationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.illustrationService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateIllustrationDto: UpdateIllustrationDto) {
        return this.illustrationService.update(+id, updateIllustrationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.illustrationService.remove(+id);
    }
}
