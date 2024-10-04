import { Body, Controller, Get, Param, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
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


  @Get('course')
  async fetch(@Query('page') page: number, @Query('itemsPerPage') itemsPerPage: number){
    try{
      return await this.courseService.getCourse(page, itemsPerPage);
    }
    catch(err){
      throw new UnauthorizedException("Diddy in the house !")
    }
  }

  @Get('course/:id')
  async fetch_by_user(@Param('id') id: string){
    try{
      return await this.courseService.getsingle(id);
    }
    catch(err){
      throw new UnauthorizedException("Diddy in the house !")
    }
  }
}
