import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { Player } from '../players/player.entity';
import { GamePlayer } from '../game-players/game-player.entity';
import { Throw } from '../throws/throw.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => {
    const qbMock = {
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getRawMany: jest.fn(),
    };
    return {
      find: jest.fn((entity) => entity),
      findOne: jest.fn((entity) => entity),
      createQueryBuilder: jest.fn(() => qbMock),
    };
  },
);

describe('GamesService', () => {
  let service: GamesService;
  let repositoryMock: MockType<Repository<Game>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Player),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(GamePlayer),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Throw),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    repositoryMock = module.get(getRepositoryToken(Game));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call repository.find and return the array of games', async () => {
      const games = [{ id: 1, type: 'Test Game' }];
      repositoryMock.find?.mockReturnValue(games);

      expect(await service.findAll()).toEqual(games);
      expect(repositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if game is not found', async () => {
      const qb: any = repositoryMock.createQueryBuilder!();
      qb.getRawMany.mockResolvedValue([]);

      await expect(service.findOne(999)).rejects.toThrow('Game with ID 999 not found');
    });

    it('should return game details and calculate player stats correctly', async () => {
      const qb: any = repositoryMock.createQueryBuilder!();
      qb.getRawMany.mockResolvedValue([
        {
          game_id: 1,
          game_type: '501',
          player_id: 'p1',
          player_name: 'Alice',
          throw_id: 1,
          score: 20,
          modifier: 3,
        },
        {
          game_id: 1,
          game_type: '501',
          player_id: 'p1',
          player_name: 'Alice',
          throw_id: 2,
          score: 1,
          modifier: 0, // Miss, should count towards missCount
        },
        {
          game_id: 1,
          game_type: '501',
          player_id: 'p1',
          player_name: 'Alice',
          throw_id: 3,
          score: 20,
          modifier: 1, // Round 1 total: 60 + 0 + 20 = 80
        },
        {
          game_id: 1,
          game_type: '501',
          player_id: 'p1',
          player_name: 'Alice',
          throw_id: 4,
          score: 20,
          modifier: 3, // Round 2 start (score 60)
        }
      ]);

      const result = await service.findOne(1);

      expect(result.id).toEqual(1);
      expect(result.type).toEqual('501');
      expect(result.players).toHaveLength(1);
      
      const alice = result.players[0] as any;
      expect(alice.id).toEqual('p1');
      expect(alice.name).toEqual('Alice');
      expect(alice.missCount).toEqual(1);
      
      // Calculate average: Round 1 = 80, Round 2 = 60. Sum = 140. Rounds = 2. Avg = 70.
      expect(alice.averageScorePerRound).toEqual(70);
    });
  });
});
