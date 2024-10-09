import { IsEmail, IsStrongPassword, Length } from 'class-validator';

export class RemoveDataPageDto {
    @IsEmail()
    @Length(8, 120)
    email: string;

    @IsStrongPassword()
    @Length(8, 256)
    password: string;
}
