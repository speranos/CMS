import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { validate } from 'class-validator';
import { UserDto } from 'Dtos/user_init.dto';
import { JwtGuard } from 'guards/jwt.guard';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post('Signup')
  async Signup(@Body() UserDto: UserDto, @Res() res: Response){
    console.log("HOLAAA !!!")
    try{
    const js = await this.userService.createUSer(UserDto);
    return res.status(HttpStatus.CREATED).json({message: js});
  }
  catch(err){
    throw new UnauthorizedException("User already exist please loging !")
  }
}

@Post('Signin')
async Signin(@Body() UserDto: UserDto, @Res() res: Response){
  try{
    const js = await this.userService.checkUSer(UserDto);
    return res.status(HttpStatus.OK).json(js);
  }
  catch(err){
    throw new UnauthorizedException("Incorrect UserName or Password !")
  }
}
  
  // @UseGuards(JwtGuard)

  // @Post('Logout')
  // async Logout(){

  // }

}
