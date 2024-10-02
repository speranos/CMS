import { IsString, IsInt } from 'class-validator';


export class UserDto{

    @IsString()
    UserName: string;

    @IsString()
    Pass: string;
}