import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Public()
    @Get('public')
    findAllPublic() {
        return this.userService.findAllPublic();
    }

    @Roles(Role.ADMIN, Role.CONTRIBUTOR)
    @Get(':id')
    findOne(@Param('id') id: ObjectId | string) {
        return this.userService.findOne(new ObjectId(id));
    }

    @Public()
    @Get('public/:id')
    findOnePublic(@Param('id') id: ObjectId | string) {
        return this.userService.findOnePublic(new ObjectId(id));
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
