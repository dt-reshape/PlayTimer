import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/models/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
