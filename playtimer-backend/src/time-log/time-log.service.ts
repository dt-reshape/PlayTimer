import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeLogEntity } from './models/time-log.entity';
import { Between, Repository } from 'typeorm';
import { Report } from './models/interfaces/report.interface';
import { Statistics } from './models/interfaces/statistics.interface';
import { TimeLog } from './models/interfaces/time-log.interface';
import { TimeLogDto } from './models/dtos/time-log.dto';
import {TimeLogHistory} from "./models/interfaces/time-log-history.interface";

@Injectable()
export class TimeLogService {
  constructor(
    @InjectRepository(TimeLogEntity)
    private readonly timeLogRepository: Repository<TimeLogEntity>,
  ) {}

  async getReport(
    id: number,
    fromDate: string,
    toDate: string,
  ): Promise<Report[]> {
    const queryResult = await this.timeLogRepository.find({
      select: ['hours', 'date'],
      where: [
        {
          user: {
            id: id,
          },
          date: Between(fromDate, toDate),
        },
      ],
    });
    const uniqueDates = new Map<string, number>();
    queryResult.forEach((timeLog) => {
      const key = timeLog.date.toISOString();
      const value = uniqueDates.get(timeLog.date.toISOString());
      if (!value) {
        uniqueDates.set(key, timeLog.hours);
      } else {
        uniqueDates.set(key, value + timeLog.hours);
      }
    });
    const result = [];
    uniqueDates.forEach((hours, date) => {
      result.push({
        date: date,
        count: hours,
      });
    });
    return result;
  }

  async getStatistics(id: number): Promise<Statistics> {
    const queryResult = await this.timeLogRepository.find({
      where: {
        user: {
          id: id,
        },
      },
      relations: ['game'],
    });
    let hours = 0;
    queryResult.forEach((timeLog) => {
      hours += timeLog.hours;
    });
    const games = [];
    queryResult.forEach((timeLog) => {
      if (games.indexOf(timeLog.game.id) === -1) {
        games.push(timeLog.game.id);
      }
    });
    return {
      games: games.length,
      hours,
    };
  }

  async logTime(timeLogDto: TimeLogDto): Promise<TimeLog> {
    return this.timeLogRepository.save(timeLogDto);
  }

  async getLogHistory(id: number): Promise<TimeLogHistory[]> {
    return this.timeLogRepository
      .find({
        where: {
          user: {
            id: id,
          },
        },
        order: {
          id: 'DESC',
        },
        take: 10,
        relations: ['user', 'game'],
      })
      .then((res) =>
        res.map((timeLog) => {
          return {
            id: timeLog.id,
            userId: timeLog.user.id,
            apiIdent: timeLog.game.apiIdent,
            hours: timeLog.hours,
            date: timeLog.date,
          };
        }),
      );
  }
}
