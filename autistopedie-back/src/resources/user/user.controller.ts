import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: ObjectId | string) {
        return this.userService.findOne(new ObjectId(id));
    }

    @Patch(':id')
    update(@Param('id') id: ObjectId | string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(new ObjectId(id), updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectId | string, @Body() removeUserDto: RemoveUserDto) {
        return this.userService.remove(new ObjectId(id), removeUserDto);
    }
}
