import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './models/game.entity';
import { Repository } from 'typeorm';
import { Game } from './models/game.interface';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
  ) {}

  async getGame(apiIdent: string): Promise<Game> {
    let result = await this.gameRepository.findOne({
      where: {
        apiIdent: apiIdent,
      },
    });
    if (!result) {
      result = await this.gameRepository.save({
        apiIdent: apiIdent,
      });
    }
    return result;
  }
}
