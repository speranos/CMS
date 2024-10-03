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
async Signin(UserDto: UserDto){
  return await this.userService.checkUSer(UserDto);
}

  
  @UseGuards(JwtGuard)

  @Post('Logout')
  async Logout(){

  }

}
