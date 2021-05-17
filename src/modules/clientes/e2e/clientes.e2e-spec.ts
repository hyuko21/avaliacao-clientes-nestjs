import Faker from 'faker';
import { CoreModule } from '@/config/core.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ClientesModule } from '#/clientes/clientes.module';
import { mockNestApp } from '@/test/app';
import { truncate } from '@/test/db';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { mockAddClienteDTO } from '#/clientes/dtos/test/mock-add-cliente.dto';
import { ClientesConfig } from '#/clientes/config/clientes.config';

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

  describe(`POST ${ClientesConfig.prefix}`, () => {
    const baseURL = ClientesConfig.prefix;
    let requestBody: IAddClienteDTO;

    beforeEach(() => {
      requestTest = request(app.getHttpServer()).post(baseURL);
      requestBody = mockAddClienteDTO();
      requestTest.send(requestBody);
    });

    describe('when body.email is invalid', () => {
      beforeEach(() => {
        requestBody.email = Faker.datatype.string();
      });

      it('should return 400 if body.email is invalid', async () => {
        await requestTest.send(requestBody).expect(400, {
          statusCode: 400,
          message: ['email must be an email'],
          error: 'Bad Request',
        });
      });
    });

    describe('when body.telefone is invalid', () => {
      beforeEach(() => {
        requestBody.telefone = Faker.datatype.string();
      });

      it('should return 400 if body.telefone is invalid', async () => {
        await requestTest.send(requestBody).expect(400, {
          statusCode: 400,
          message: ['telefone must be a valid telefone number'],
          error: 'Bad Request',
        });
      });
    });

    describe('when body.cpf is invalid', () => {
      beforeEach(() => {
        requestBody.cpf = Faker.datatype.string();
      });

      it('should return 400 if body.cpf is invalid', async () => {
        await requestTest.send(requestBody).expect(400, {
          statusCode: 400,
          message: ['cpf must be a valid cpf number'],
          error: 'Bad Request',
        });
      });
    });

    it('should create new Cliente on success', async () => {
      await requestTest.expect(201);
    });
  });
});
