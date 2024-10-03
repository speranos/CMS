import { Injectable } from '@nestjs/common';
import { User } from 'schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'Dtos/user_init.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModule: Model<User>){}

    async createUSer(UserDto: UserDto){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(UserDto.Pass, saltOrRounds);
        UserDto.Pass = hash;
        const ret = await new this.UserModule(UserDto);
        await ret.save();
        return ;
    }

    async checkUSer(UserDto: UserDto){
        return;
    }

}
