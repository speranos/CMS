import { IsString, IsInt, IsNotEmpty } from 'class-validator';


export class UserDto{

    @IsString()
    @IsNotEmpty()
    UserName: string;

    @IsString()
    @IsNotEmpty()
    Pass: string;
}