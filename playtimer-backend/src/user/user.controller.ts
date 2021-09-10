import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './models/dtos/user.dto';
import { User } from './models/interfaces/user.interface';
import { UserLoginDto } from './models/dtos/user-login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginResult } from './models/interfaces/login-result.interface.';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: UserLoginDto): Promise<LoginResult> {
    return this.userService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  async getProfile(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.get(id);
  }
}
