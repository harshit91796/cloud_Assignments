import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: any }> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string; data: any }> {
    return await this.usersService.login(loginDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getUserProfile(
    @Request() req,
  ): Promise<{ message: string; user: any }> {
    return await this.usersService.getUserProfile(req.user.id);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Request() req): Promise<{ message: string }> {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      await this.usersService.logOut(token);
      return { message: 'Logged out successfully' };
    }

    return { message: 'Token not provided' };
  }
}
