import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { User } from './models/interfaces/user.interface';
import { UserDto } from './models/dtos/user.dto';
import { UserLoginDto } from './models/dtos/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginResult } from './models/interfaces/login-result.interface.';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const isEmailExists = await this.isEmailExists(userDto.email);
    if (isEmailExists) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    const isLoginExists = await this.isLoginExists(userDto.login);
    if (isLoginExists) {
      throw new HttpException('Login already in use', HttpStatus.CONFLICT);
    }
    userDto.password = await this.authService.hashPassword(userDto.password);
    return this.userRepository.save(userDto).then((savedUser) => {
      const { password, ...user } = savedUser;
      return user;
    });
  }

  async login(userDto: UserLoginDto): Promise<LoginResult> {
    const user = await this.findUserByLogin(userDto.login);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await this.validatePassword(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException(
        'Login was no successful',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      id: user.id,
      accessToken: await this.authService.generateJwt(user),
      expiresIn: 10000,
      tokenType: 'JWT',
    };
  }

  async get(id: number): Promise<User> {
    return this.userRepository.findOne(
      { id },
      { relations: ['achievements', 'friends'] },
    );
  }

  private findUserByLogin(login: string): Promise<User> {
    return this.userRepository.findOne(
      { login },
      { select: ['id', 'login', 'password'] },
    );
  }

  private async isEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user !== undefined;
  }

  private async isLoginExists(login: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { login: login } });
    return user !== undefined;
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }
}
