import { HttpCode, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'Dtos/user_init.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModule: Model<User>, private jwt: JwtService){}

    async createUSer(UserDto: UserDto){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(UserDto.Pass, saltOrRounds);
        UserDto.Pass = hash;
        const ret = await new this.UserModule(UserDto);
        await ret.save();
        console.log(ret);
        return  'User Created successfully you can Sign In';
    }

    async checkUSer(UserDto: UserDto){
        const user = await this.UserModule.findOne({'UserName': UserDto.UserName})
        if(!user)
            throw new UnauthorizedException;
        const valid = await bcrypt.compare(UserDto.Pass, user.Pass);
        if(!valid)
            throw new UnauthorizedException;
        const { Pass, ...Juser } = UserDto;
        const jj = this.jwt.sign(Juser);
        console.log(jj);
        interface login{
            userId: string,
            Jwt: string,
        }
        let login = {userId: user.id, Jwt: jj}
        console.log(login);
        return login;
    }

}
