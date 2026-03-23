import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/games (GET)', () => {
    it('should return an array of games', () => {
      return request(app.getHttpServer())
        .get('/games')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe('/games/popularity (GET)', () => {
    it('should return totalGames and a games array with correct shape', () => {
      return request(app.getHttpServer())
        .get('/games/popularity')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('totalGames');
          expect(Array.isArray(res.body.games)).toBe(true);
          if (res.body.games.length > 0) {
            expect(res.body.games[0]).toHaveProperty('type');
            expect(res.body.games[0]).toHaveProperty('count');
            expect(res.body.games[0]).toHaveProperty('percentage');
            expect(typeof res.body.games[0].count).toBe('number');
          }
        });
    });

    it('should return games sorted by count descending', () => {
      return request(app.getHttpServer())
        .get('/games/popularity')
        .expect(200)
        .expect((res) => {
          const counts: number[] = res.body.games.map((g: any) => g.count);
          for (let i = 1; i < counts.length; i++) {
            expect(counts[i]).toBeLessThanOrEqual(counts[i - 1]);
          }
        });
    });
  });

  describe('/games/:id (GET)', () => {
    it('should return game details with player stats for a valid id', () => {
      return request(app.getHttpServer())
        .get('/games/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', 1);
          expect(res.body).toHaveProperty('players');
          expect(Array.isArray(res.body.players)).toBe(true);
          if (res.body.players.length > 0) {
            expect(res.body.players[0]).toHaveProperty('averageScorePerRound');
            expect(res.body.players[0]).toHaveProperty('missCount');
          }
        });
    });

    it('should return 404 for a non-existent game id', () => {
      return request(app.getHttpServer())
        .get('/games/999999')
        .expect(404);
    });

    it('should return 400 for a non-numeric game id', () => {
      return request(app.getHttpServer())
        .get('/games/not-a-number')
        .expect(400);
    });
  });

  describe('/players/leaderboard (GET)', () => {
    it('should return an array of player stats', () => {
      return request(app.getHttpServer())
        .get('/players/leaderboard')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should return players with the correct shape', () => {
      return request(app.getHttpServer())
        .get('/players/leaderboard')
        .expect(200)
        .expect((res) => {
          if (res.body.length > 0) {
            const player = res.body[0];
            expect(player).toHaveProperty('id');
            expect(player).toHaveProperty('name');
            expect(player).toHaveProperty('gamesPlayed');
            expect(player).toHaveProperty('averageScorePerRound');
            expect(player).toHaveProperty('missesPerGame');
            expect(typeof player.gamesPlayed).toBe('number');
            expect(typeof player.averageScorePerRound).toBe('number');
            expect(typeof player.missesPerGame).toBe('number');
          }
        });
    });

    it('should return players sorted by averageScorePerRound descending', () => {
      return request(app.getHttpServer())
        .get('/players/leaderboard')
        .expect(200)
        .expect((res) => {
          const averages: number[] = res.body.map(
            (p: any) => p.averageScorePerRound,
          );
          for (let i = 1; i < averages.length; i++) {
            expect(averages[i]).toBeLessThanOrEqual(averages[i - 1]);
          }
        });
    });
  });
});
