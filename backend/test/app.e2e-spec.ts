import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/games (GET)', () => {
    return request(app.getHttpServer())
      .get('/games')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/games/popularity (GET)', () => {
    return request(app.getHttpServer())
      .get('/games/popularity')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
          expect(res.body[0]).toHaveProperty('type');
          expect(res.body[0]).toHaveProperty('count');
          expect(typeof res.body[0].count).toBe('number');
        }
      });
  });

  it('/games/:id (GET)', () => {
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
});
