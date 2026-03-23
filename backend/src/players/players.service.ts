import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { GamePlayer } from '../game-players/game-player.entity';
import { Throw } from '../throws/throw.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async getLeaderboard() {
    const rawData = await this.playerRepository
      .createQueryBuilder('p')
      .leftJoin(GamePlayer, 'gp', 'gp.player_id = p.id')
      .leftJoin(Throw, 't', 't.player_id = p.id AND t.game_id = gp.game_id')
      .select([
        'p.id AS id',
        'p.name AS name',
        'COUNT(DISTINCT gp.game_id) AS "gamesPlayed"',
        'COUNT(t.id) AS "totalThrows"',
        'SUM(CASE WHEN t.modifier = 0 THEN 1 ELSE 0 END) AS "totalMisses"',
        'SUM(COALESCE(t.score, 0) * COALESCE(t.modifier, 0)) AS "totalScore"',
      ])
      .groupBy('p.id')
      .having('gamesPlayed > 5')
      .getRawMany();

    return rawData
      .map((row) => {
        const gamesPlayed = parseInt(row.gamesPlayed) || 0;
        const totalThrows = parseInt(row.totalThrows) || 0;
        const totalMisses = parseInt(row.totalMisses) || 0;
        const totalScore = parseInt(row.totalScore) || 0;

        return {
          id: row.id,
          name: row.name,
          gamesPlayed,
          averageScorePerRound:
            totalThrows > 0
              ? Math.round((totalScore / totalThrows) * 3 * 100) / 100
              : 0,
          missesPerGame:
            gamesPlayed > 0
              ? Number((totalMisses / gamesPlayed).toFixed(2))
              : 0,
        };
      })
      .sort((a, b) => b.averageScorePerRound - a.averageScorePerRound);
  }
}
