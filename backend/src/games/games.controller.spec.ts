import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let controller: GamesController;
  let service: GamesService;

  const mockGamesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useValue: mockGamesService,
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      const games = [{ id: 1, type: 'Test Game' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(games as any);

      expect(await controller.findAll()).toEqual(games);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single game', async () => {
      const result = { id: 1, type: 'Test Game', players: [] };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(1)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
