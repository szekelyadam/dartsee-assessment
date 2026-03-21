import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findOne(id);
  }
}
