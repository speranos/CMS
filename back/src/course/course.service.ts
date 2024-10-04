import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourseDto } from 'Dtos/course.dto';
import { Model } from 'mongoose';
import { Course } from 'schemas/course.schema';
import { User } from 'schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private CourseModule: Model<Course>, private Userserv: UserService){}

    async   createCourse(course: CourseDto){
        const ret = await new this.CourseModule(course);
        await ret.save();
        console.log(ret);
        return 'created !';
    }
    async   getCourse(page: number, itemsPerPage: number){
        const ret = await this.CourseModule.find().skip(page * itemsPerPage).limit(itemsPerPage);
        console.log(page, itemsPerPage, page * itemsPerPage );
        if(!ret)
            return 'Out Of range !';
        return ret;
    }
    async   getsingle(id: string){
        console.log(id);
        const ret = await this.CourseModule.findById(id);
        if(!ret)
            return 'Not found !';
        return ret;
    }
    async GetByUser(page: number, itemsPerPage: number, id: string){
        const username = await this.Userserv.GetUserName(id);

        const ret = await this.CourseModule.find({instructor: username}).skip(page * itemsPerPage).limit(itemsPerPage);
        console.log(ret );
        if(!ret)
            return 'Out Of range !';
        return ret;

    }
}
