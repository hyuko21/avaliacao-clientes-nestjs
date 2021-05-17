import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { SWAGGER_API_ROOT } from '@/swagger/constants';

describe('No Cache Middleware', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`GET ${SWAGGER_API_ROOT}`, () => {
    it('should have No Cache headers enabled', async () => {
      await request(app.getHttpServer())
        .get(SWAGGER_API_ROOT)
        .expect(
          'cache-control',
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        )
        .expect('pragma', 'no-cache')
        .expect('expires', '0')
        .expect('surrogate-control', 'no-store');
    });
  });
});
