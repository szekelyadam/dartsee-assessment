import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;

  const mockPlayersService = {
    getLeaderboard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: mockPlayersService,
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLeaderboard', () => {
    it('should return an array of player stats for the leaderboard', async () => {
      const leaderboard = [
        {
          id: '1',
          name: 'Player 1',
          gamesPlayed: 5,
          averageScorePerRound: 80.5,
          missesPerGame: 1.2,
        },
      ];
      jest.spyOn(service, 'getLeaderboard').mockResolvedValue(leaderboard as any);

      expect(await controller.getLeaderboard()).toEqual(leaderboard);
      expect(service.getLeaderboard).toHaveBeenCalled();
    });
  });
});
