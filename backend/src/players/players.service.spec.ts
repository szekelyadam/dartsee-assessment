import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
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
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
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

describe('PlayersService', () => {
  let service: PlayersService;
  let repositoryMock: MockType<Repository<Player>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    repositoryMock = module.get(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLeaderboard', () => {
    it('should calculate leaderboard stats correctly based on raw query data', async () => {
      const qb: any = repositoryMock.createQueryBuilder!();
      
      // Simulate raw data returned by QueryBuilder
      qb.getRawMany.mockResolvedValue([
        {
          id: 'p1',
          name: 'Alice',
          gamesPlayed: '2',
          totalThrows: '6',
          totalMisses: '1',
          totalScore: '140',
        },
        {
          id: 'p2',
          name: 'Bob',
          gamesPlayed: '1',
          totalThrows: '3',
          totalMisses: '3',
          totalScore: '30',
        },
      ]);

      const result = await service.getLeaderboard();

      // Alice should be first since averageScorePerRound (70) > Bob's (30)
      expect(result).toEqual([
        {
          id: 'p1',
          name: 'Alice',
          gamesPlayed: 2,
          averageScorePerRound: 70, // (140 / 6) * 3 = 70
          missesPerGame: 0.5, // 1 miss / 2 games = 0.5
        },
        {
          id: 'p2',
          name: 'Bob',
          gamesPlayed: 1,
          averageScorePerRound: 30, // (30 / 3) * 3 = 30
          missesPerGame: 3, // 3 misses / 1 game = 3
        },
      ]);
    });

    it('should handle zero games played gracefully', async () => {
      const qb: any = repositoryMock.createQueryBuilder!();
      
      qb.getRawMany.mockResolvedValue([
        {
          id: 'p3',
          name: 'Charlie',
          gamesPlayed: '0',
          totalThrows: '0',
          totalMisses: '0',
          totalScore: '0',
        },
      ]);

      const result = await service.getLeaderboard();

      expect(result).toEqual([
        {
          id: 'p3',
          name: 'Charlie',
          gamesPlayed: 0,
          averageScorePerRound: 0,
          missesPerGame: 0,
        },
      ]);
    });
  });
});
