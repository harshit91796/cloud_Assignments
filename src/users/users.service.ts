import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './entity/user.entity.pgmodel';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import axios from 'axios';
import { User } from './types/user.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const { email } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const createdUser = await this.userModel.create(createUserDto);
    const user = createdUser as User;

    return {
      message: 'User created successfully',
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<{ data: any; message: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel
      .findOne({ email }, { name: 1, email: 1, password: 1, _id: 1 })
      .exec();
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }
    const data = await this.authService.token(user);
    return {
      message: 'Logged in successfully',
      data,
    };
  }

  async getUserProfile(
    userId: string,
  ): Promise<{ message: string; user: any }> {
    const user = await this.userModel.findById(userId, {
      name: 1,
      email: 1,
      age: 1,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return { message: 'User profile  data', user };
  }

  async getRandomJoke(): Promise<{ message: string; data: string }> {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');

    return { message: 'your random joke', data: response.data.value };
  }

  async logOut(token:string): Promise<{ message: string}> {
    await this.authService.blacklistToken(token)
    return { message: 'Logged out successfully' }
  }
}
