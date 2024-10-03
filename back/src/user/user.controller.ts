import { Body, Controller, Get, HttpException, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { validate } from 'class-validator';
import { UserDto } from 'Dtos/user_init.dto';
import { JwtGuard } from 'guards/jwt.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post('Signup')
  async Signup(@Body() UserDto: UserDto){
    try{
    return await this.userService.createUSer(UserDto);
  }
  catch(err){
    throw new UnauthorizedException("User already exist please loging !")
  }
}

@Post('Signin')
async Signin(@Body() UserDto: UserDto){
  try{
    return await this.userService.checkUSer(UserDto);
  }
  catch(err){
    throw new UnauthorizedException("Incorrect UserName or Password !")
  }
}

  
  @UseGuards(JwtGuard)

  @Post('Logout')
  async Logout(){

  }

}
