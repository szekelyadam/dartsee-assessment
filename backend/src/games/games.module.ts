import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Player } from '../players/player.entity';
import { GamePlayer } from '../game-players/game-player.entity';
import { Throw } from '../throws/throw.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Player, GamePlayer, Throw])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
