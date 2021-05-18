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
import { getRepository } from 'typeorm';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import {
  mockClienteEntity,
  mockManyClienteEntity,
} from '#/clientes/data/entities/test/mock-cliente.entity';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';
import { mockModifyClienteDTO } from '#/clientes/dtos/test/mock-modify-cliente.dto';

describe('Clientes e2e', () => {
  let app: INestApplication;
  let agentTest: request.SuperTest<request.Test>;
  let requestTest: request.Test;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, ClientesModule],
    }).compile();

    app = mockNestApp(moduleFixture);
    await app.init();
  });

  beforeEach(async () => {
    agentTest = request(app.getHttpServer());
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
      requestTest = agentTest.post(baseURL);
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

  describe(`GET ${ClientesConfig.prefix}`, () => {
    const baseURL = ClientesConfig.prefix;

    beforeEach(() => {
      requestTest = agentTest.get(baseURL);
    });

    it('should empty array if Clientes not found', async () => {
      await requestTest.expect(200, []);
    });

    it('should array of Cliente on success', async () => {
      const manyClienteEntity = await getRepository(ClienteEntity).save(
        mockManyClienteEntity(),
      );

      await requestTest.expect(200).expect(({ body }) => {
        expect(body).toEqual(
          manyClienteEntity.map((clienteEntity) => ({
            ...clienteEntity,
            criadoEm: expect.any(String),
            atualizadoEm: expect.any(String),
          })),
        );
      });
    });
  });

  describe(`PUT ${ClientesConfig.prefix}/:id`, () => {
    const baseURL = (idCliente: string) =>
      `${ClientesConfig.prefix}/${idCliente}`;

    it('should return 400 if param :id is malformed', async () => {
      const invalidIdCliente = Faker.random.word();

      await agentTest.put(baseURL(invalidIdCliente)).expect(400, {
        statusCode: 400,
        message: ['id must be a UUID'],
        error: 'Bad Request',
      });
    });

    it('should return 404 if Cliente not found', async () => {
      const randomIdCliente = Faker.datatype.uuid();

      await agentTest.put(baseURL(randomIdCliente)).expect(404, {
        statusCode: 404,
        message: 'Cliente Not Found',
      });
    });

    describe('when Cliente exists', () => {
      let clienteEntity: ClienteEntity;

      beforeEach(async () => {
        clienteEntity = await getRepository(ClienteEntity).save(
          mockClienteEntity(),
        );
        requestTest = agentTest.put(baseURL(clienteEntity.id));
      });

      it('should return 200 if body is empty', async () => {
        await requestTest.expect(200).expect(({ body }) => {
          expect(body).toEqual({
            ...clienteEntity,
            criadoEm: expect.any(String),
            atualizadoEm: expect.any(String),
          });
        });
      });

      describe('when body is provided', () => {
        let requestBody: IModifyClienteDTO;

        beforeEach(() => {
          requestBody = mockModifyClienteDTO();
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

        it('should return 200 (with modifications) on success', async () => {
          await requestTest
            .send(requestBody)
            .expect(200)
            .expect(({ body }) => {
              expect(body).toEqual({
                id: clienteEntity.id,
                ...requestBody,
                criadoEm: expect.any(String),
                atualizadoEm: expect.any(String),
              });
            });
        });
      });
    });
  });

  describe(`DELETE ${ClientesConfig.prefix}/:id`, () => {
    const baseURL = (idCliente: string) =>
      `${ClientesConfig.prefix}/${idCliente}`;

    it('should return 400 if param :id is malformed', async () => {
      const invalidIdCliente = Faker.random.word();

      await agentTest.delete(baseURL(invalidIdCliente)).expect(400, {
        statusCode: 400,
        message: ['id must be a UUID'],
        error: 'Bad Request',
      });
    });

    it('should return 404 if Cliente not found', async () => {
      const randomIdCliente = Faker.datatype.uuid();

      await agentTest.delete(baseURL(randomIdCliente)).expect(404, {
        statusCode: 404,
        message: 'Cliente Not Found',
      });
    });

    describe('when Cliente exists', () => {
      let clienteEntity: ClienteEntity;

      beforeEach(async () => {
        const manyClienteEntity = await getRepository(ClienteEntity).save(
          mockManyClienteEntity(),
        );
        clienteEntity = Faker.random.arrayElement(manyClienteEntity);
        requestTest = agentTest.delete(baseURL(clienteEntity.id));
      });

      it('should return 204 and delete correct Cliente', async () => {
        await requestTest.expect(204);
        const [countClienteEntity, countManyClienteEntity] = await Promise.all([
          getRepository(ClienteEntity).count({
            where: { id: clienteEntity.id },
          }),
          getRepository(ClienteEntity).count(),
        ]);
        expect(countClienteEntity).toBe(0);
        expect(countManyClienteEntity).toBeGreaterThan(0);
      });
    });
  });
});
