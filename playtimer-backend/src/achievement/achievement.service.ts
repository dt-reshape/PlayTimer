import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementEntity } from './models/achievement.entity';
import { Repository } from 'typeorm';
import { Achievement } from './models/achievement.interface';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(AchievementEntity)
    private readonly achievementRepository: Repository<AchievementEntity>,
  ) {}

  async getAll(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async get(id: number): Promise<Achievement> {
    return this.achievementRepository.findOne({ id });
  }
}
