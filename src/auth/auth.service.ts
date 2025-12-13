
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      // user is a Mongoose Document, we need to convert it to a plain object
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    // The 'user' object here is the result from validateUser, which is a plain JS object
    const payload = { email: user.email, sub: user.userId }; // Ensure sub is mapped correctly
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
