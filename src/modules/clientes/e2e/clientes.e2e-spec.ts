import { CoreModule } from '@/config/core.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ClientesModule } from '#/clientes/clientes.module';
import { mockNestApp } from '@/test/app';
import { truncate } from '@/test/db';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { mockAddClienteDTO } from '#/clientes/dtos/test/mock-add-cliente.dto';

describe('Clientes e2e', () => {
  let app: INestApplication;
  let requestTest: request.Test;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, ClientesModule],
    }).compile();

    app = mockNestApp(moduleFixture);
    await app.init();
  });

  beforeEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await truncate();
    await app.close();
  });

  describe('POST /clientes', () => {
    const baseURL = '/clientes';
    let requestBody: IAddClienteDTO;

    beforeEach(() => {
      requestTest = request(app.getHttpServer()).post(baseURL);
      requestBody = mockAddClienteDTO();
    });

    describe('when request body is valid', () => {
      beforeEach(() => {
        requestTest.send(requestBody);
      });

      it('should create new Cliente on success', async () => {
        await requestTest.expect(201).expect(({ body }) => {
          expect(body).toBeTruthy();
        });
      });
    });
  });
});
