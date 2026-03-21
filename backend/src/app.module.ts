import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Game } from './games/game.entity';
import { Player } from './players/player.entity';
import { GamePlayer } from './game-players/game-player.entity';
import { Throw } from './throws/throw.entity';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, '..', '..', 'database', 'dartsee.sqlite'),
      entities: [Game, Player, GamePlayer, Throw],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
