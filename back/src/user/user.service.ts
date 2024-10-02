import { Injectable } from '@nestjs/common';
import { User } from 'schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';




@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModule: Model<User>){}
    async getdTA(){
        return 'user';
    }

}
