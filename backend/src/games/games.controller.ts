import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }
}
