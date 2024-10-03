import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourseDto } from 'Dtos/course.dto';
import { Model } from 'mongoose';
import { Course } from 'schemas/course.schema';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private CourseModule: Model<Course>){}

    async createCourse(course: CourseDto){
        const ret = await new this.CourseModule(course);
        await ret.save();
        console.log(ret);
        return 'created !';
    }
    async getCourse(page: number, itemsPerPage: number){
        const ret = await this.CourseModule.find().skip(page * itemsPerPage).limit(itemsPerPage);
        console.log(page, itemsPerPage, page * itemsPerPage );
        if(!ret)
            return 'Out Of range !';
        return ret;
    }
}
