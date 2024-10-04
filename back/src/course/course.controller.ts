import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseDto } from 'Dtos/course.dto';
import { JwtGuard } from 'guards/jwt.guard';
import { CourseService } from './course.service';
import { Response } from 'express';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // @UseGuards(JwtGuard)
  @Post('Create')
  async Add(@Body() course: CourseDto, @Res() res: Response){
    try{
      console.log("HAAAAAAAA", course);
      await this.courseService.createCourse(course);
      return res.status(HttpStatus.CREATED).json({message: 'success'});
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
  async fetch_by_page(@Param('id') id: string){
    try{
      return await this.courseService.getsingle(id);
    }
    catch(err){
      throw new UnauthorizedException("Diddy in the house !")
    }
  }

  // @UseGuards(JwtGuard)
  @Get('usercourses/:id')
  async fetch_by_user(@Query('page') page: number, @Query('itemsPerPage') itemsPerPage: number, @Param('id') id: string){
    console.log(id);
    try{
      return await this.courseService.GetByUser(page, itemsPerPage, id);
    }
    catch(err){
      throw new UnauthorizedException("Diddy in the house !")
    }
  }
}
