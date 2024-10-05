import { UsersService } from 'src/users/users.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService ,
    private readonly usersService: UsersService
  ) {}
  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Get('random-joke')
  @UseGuards(AuthGuard)
  async getRandomJoke(): Promise<{ message: string; data: string }> {
    return await this.usersService.getRandomJoke();
  }
}
