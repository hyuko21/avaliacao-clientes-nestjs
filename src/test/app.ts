import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { TestingModule } from '@nestjs/testing/testing-module';

export function mockNestApp(moduleFixture: TestingModule): INestApplication {
  const app: INestApplication = moduleFixture.createNestApplication();
  return app;
}
