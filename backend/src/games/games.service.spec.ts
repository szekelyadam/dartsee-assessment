import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn((entity) => entity),
  }),
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
});
