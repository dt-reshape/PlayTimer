import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementEntity } from './models/achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity])],
  providers: [AchievementService],
  controllers: [AchievementController],
})
export class AchievementModule {}
