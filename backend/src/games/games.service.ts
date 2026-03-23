import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Game } from './game.entity';
import { Player } from '../players/player.entity';
import { GamePlayer } from '../game-players/game-player.entity';
import { Throw } from '../throws/throw.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(GamePlayer)
    private readonly gamePlayerRepository: Repository<GamePlayer>,
    @InjectRepository(Throw)
    private readonly throwRepository: Repository<Throw>,
  ) {}

  async findAll(): Promise<Game[]> {
    const rawData = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoin(GamePlayer, 'gp', 'gp.game_id = game.id')
      .leftJoin(Player, 'p', 'p.id = gp.player_id')
      .select([
        'game.id AS game_id',
        'game.type AS game_type',
        'p.id AS player_id',
        'p.name AS player_name',
      ])
      .getRawMany();

    const gamesMap = new Map<string, any>();
    for (const row of rawData) {
      if (!gamesMap.has(row.game_id)) {
        gamesMap.set(row.game_id, {
          id: row.game_id,
          type: row.game_type,
          players: [],
        });
      }
      if (
        row.player_id &&
        !gamesMap.get(row.game_id).players.find((p) => p.id === row.player_id)
      ) {
        gamesMap.get(row.game_id).players.push({
          id: row.player_id,
          name: row.player_name,
        });
      }
    }

    return Array.from(gamesMap.values());
  }

  async getPopularity() {
    const rawData = await this.gamesRepository
      .createQueryBuilder('game')
      .select(['game.type AS type', 'COUNT(game.id) AS count'])
      .groupBy('game.type')
      .getRawMany();

    const parsedData = rawData.map((row) => ({
      type: row.type,
      count: Number(row.count),
    }));

    const totalGames = parsedData.reduce((sum, item) => sum + item.count, 0);

    const games = parsedData.map((item) => ({
      ...item,
      percentage: totalGames > 0 ? (item.count / totalGames) * 100 : 0,
    }));

    return {
      totalGames,
      games: games.sort((a, b) => b.count - a.count),
    };
  }

  async findOne(id: number) {
    const rawData = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoin(GamePlayer, 'gp', 'gp.game_id = game.id')
      .leftJoin(Player, 'p', 'p.id = gp.player_id')
      .leftJoin(Throw, 't', 't.game_id = game.id AND t.player_id = p.id')
      .where('game.id = :id', { id })
      .orderBy('t.id', 'ASC')
      .select([
        'game.id AS game_id',
        'game.type AS game_type',
        'p.id AS player_id',
        'p.name AS player_name',
        't.id AS throw_id',
        't.score AS score',
        't.modifier AS modifier',
      ])
      .getRawMany();

    if (rawData.length === 0) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    const game = {
      id: rawData[0].game_id,
      type: rawData[0].game_type,
    };

    const playersMap = new Map<string, any>();
    const throwsMap = new Map<string, any[]>();

    for (const row of rawData) {
      if (row.player_id && !playersMap.has(row.player_id)) {
        playersMap.set(row.player_id, {
          id: row.player_id,
          name: row.player_name,
        });
        throwsMap.set(row.player_id, []);
      }
      if (row.player_id && row.throw_id) {
        throwsMap.get(row.player_id)!.push({
          id: row.throw_id,
          score: row.score,
          modifier: row.modifier,
        });
      }
    }

    const players = Array.from(playersMap.values());

    const playerStats = players.map((player) => {
      const playerThrows = throwsMap.get(player.id) || [];
      const missCount = playerThrows.filter((t) => t.modifier === 0).length;

      let roundsSum = 0;
      let roundsCount = 0;

      for (let i = 0; i < playerThrows.length; i += 3) {
        const roundThrows = playerThrows.slice(i, i + 3);
        const roundScore = roundThrows.reduce(
          (sum, t) => sum + (t.score || 0) * (t.modifier || 0),
          0,
        );
        roundsSum += roundScore;
        roundsCount++;
      }

      const averageScorePerRound =
        roundsCount > 0 ? Math.round((roundsSum / roundsCount) * 100) / 100 : 0;

      return {
        ...player,
        missCount,
        averageScorePerRound,
      };
    });

    return {
      ...game,
      players: playerStats,
    };
  }
}
