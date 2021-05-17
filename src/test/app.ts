import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { TestingModule } from '@nestjs/testing/testing-module';

export function mockNestApp(moduleFixture: TestingModule): INestApplication {
  const app: INestApplication = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  return app;
}
