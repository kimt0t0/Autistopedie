import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Length } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateUserDto {
    @IsEmail()
    @Length(8, 120)
    email: string;

    @IsStrongPassword()
    @Length(8, 256)
    password: string;

    @IsString()
    @Length(3, 80)
    @IsOptional()
    username: string;

    @IsEmail()
    @Length(8, 120)
    @IsOptional()
    newEmail: string;

    @IsStrongPassword()
    @IsOptional()
    @Length(8, 256)
    newPassword: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role;
}
