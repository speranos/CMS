import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseDto } from 'Dtos/course.dto';
import { JwtGuard } from 'guards/jwt.guard';
import { CourseService } from './course.service';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtGuard)
  @Post('Create')
  async Add(@Body() course: CourseDto){
    try{
      return await this.courseService.createCourse(course);
    }
    catch(err){
      throw new UnauthorizedException("Missing field !")
    }
  }


  @Get()
  async fetch(){

  }
  // @Get()
  // async fetch_by_user(){

  // }
}
