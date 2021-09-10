import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:apiIdent')
  async getGame(@Param('apiIdent') apiIdent: string) {
    return this.gameService.getGame(apiIdent);
  }
}
