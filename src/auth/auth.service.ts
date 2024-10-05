import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  private blacklistedTokens: Set<string> = new Set();
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async token(user: any): Promise<any> {
    const token = this.jwtService.sign({ email: user.email, id: user._id });
    return { access_token: token, user };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  blacklistToken(token: string): void {
    this.blacklistedTokens.add(token);
  }
  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }
}
