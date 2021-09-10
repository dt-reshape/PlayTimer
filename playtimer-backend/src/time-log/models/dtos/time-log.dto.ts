import { IsDate, IsInt, IsNumber, IsPositive } from 'class-validator';
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

  @Type(() => Date)
  @IsDate()
  date: Date;
}
