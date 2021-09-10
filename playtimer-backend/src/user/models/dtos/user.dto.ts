import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsISO8601()
  registrationDate: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profilePic?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
