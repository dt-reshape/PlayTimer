import { IsInt, IsNumber, IsPositive, IsNotEmpty, IsISO8601 } from 'class-validator';
import { Type } from 'class-transformer';

export class TimeLogDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  userId: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  gameId: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  hours: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;
}
