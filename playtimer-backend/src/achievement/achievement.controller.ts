import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { Achievement } from './models/achievement.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(): Promise<Achievement[]> {
    return this.achievementService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Achievement> {
    return this.achievementService.get(id);
  }
}
