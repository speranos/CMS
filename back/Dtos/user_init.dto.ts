import { IsString, IsNotEmpty } from 'class-validator';


export class UserDto{

    @IsString()
    @IsNotEmpty()
    UserName: string;

    @IsString()
    @IsNotEmpty()
    Pass: string;
}