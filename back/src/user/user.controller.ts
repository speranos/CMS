import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDto } from 'Dtos/user_init.dto';
import { JwtGuard } from 'guards/jwt.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)

  @Post('Signup')
  async Signup(@Body() UserDto: UserDto){
    return await this.userService.createUSer(UserDto);
  }

  @Post('Signin')
  async Signin(UserDto: UserDto){
    return await this.userService.checkUSer(UserDto);
  }

  @Post('Logout')
  async Logout(){

  }

}
