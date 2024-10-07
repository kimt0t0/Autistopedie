import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from '../enums/role.enum';

export class CreateUserDto {
    @IsString()
    @Length(3, 80)
    username: string;

    @IsEmail()
    @Length(8, 120)
    email: string;

    @IsStrongPassword()
    @Length(8, 256)
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role;
}
