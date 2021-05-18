import Faker from 'faker';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '@/config/core.module';
import { AvaliacoesModule } from '#/avaliacoes/avaliacoes.module';
import { mockNestApp } from '@/test/app';
import { truncate } from '@/test/db';
import { AvaliacoesConfig } from '#/avaliacoes/config/avaliacoes.config';
import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';
import { mockAddAvaliacaoDTO } from '#/avaliacoes/dtos/test/mock-add-avaliacao.dto';
import { mockInsertTransacaoEntity } from '#/transacoes/data/entities/test/transacoes.helpers';
import { mockInsertClienteEntity } from '#/clientes/data/entities/test/clientes.helpers';
import { mockInsertAvaliacaoEntity } from '#/avaliacoes/data/entities/test/avaliacoes.helpers';

describe('Avaliacoes e2e', () => {
  let app: INestApplication;
  let agentTest: request.SuperTest<request.Test>;
  let requestTest: request.Test;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, AvaliacoesModule],
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

  describe(`POST ${AvaliacoesConfig.prefix}`, () => {
    const baseURL = AvaliacoesConfig.prefix;
    let requestBody: IAddAvaliacaoDTO;

    beforeEach(() => {
      requestTest = agentTest.post(baseURL);
      requestBody = mockAddAvaliacaoDTO();
    });

    it('should return 400 if body.nota is not in range 0-10', async () => {
      requestBody.nota = -1;
      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['nota must not be less than 0'],
        error: 'Bad Request',
      });

      requestBody.nota = 11;
      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['nota must not be greater than 10'],
        error: 'Bad Request',
      });
    });

    it('should return 400 if body.nota is not valid number', async () => {
      requestBody.nota = (<unknown>Faker.datatype.string()) as number;

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: [
          'nota must not be greater than 10',
          'nota must not be less than 0',
          'nota must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
      });
    });

    it('should return 400 if body.comentario is not valid string', async () => {
      requestBody.comentario = (<unknown>Faker.datatype.number()) as string;

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['comentario must be a string'],
        error: 'Bad Request',
      });
    });

    it('should return 400 if body.idCliente is malformed', async () => {
      requestBody.idCliente = Faker.datatype.string();

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['idCliente must be a UUID'],
        error: 'Bad Request',
      });
    });

    it('should return 400 if body.idTransacao is malformed', async () => {
      requestBody.idTransacao = Faker.datatype.string();

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['idTransacao must be a UUID'],
        error: 'Bad Request',
      });
    });

    describe('when body is valid', () => {
      describe('if Cliente not exists', () => {
        beforeEach(async () => {
          const transacaoEntity = await mockInsertTransacaoEntity();
          requestBody.idTransacao = transacaoEntity.id;
          requestTest.send(requestBody);
        });

        it('should return 404 if Cliente not found', async () => {
          await requestTest.expect(404, {
            statusCode: 404,
            message: 'Cliente Not Found',
          });
        });
      });

      describe('if Transacao not exists', () => {
        beforeEach(async () => {
          const clienteEntity = await mockInsertClienteEntity();
          requestBody.idCliente = clienteEntity.id;
          requestTest.send(requestBody);
        });

        it('should return 404 if Transacao not found', async () => {
          await requestTest.expect(404, {
            statusCode: 404,
            message: 'Transacao Not Found',
          });
        });
      });

      it('should create new Avaliacao on success', async () => {
        const clienteEntity = await mockInsertClienteEntity();
        const transacaoEntity = await mockInsertTransacaoEntity(
          undefined,
          clienteEntity,
        );
        requestBody.idCliente = clienteEntity.id;
        requestBody.idTransacao = transacaoEntity.id;

        await requestTest
          .send(requestBody)
          .expect(201)
          .expect(({ body }) => {
            expect(body).toEqual({
              ...requestBody,
              id: expect.any(String),
              criadoEm: expect.any(String),
              atualizadoEm: expect.any(String),
            });
          });
      });
    });
  });

  describe(`GET ${AvaliacoesConfig.prefix}`, () => {
    const baseURL = AvaliacoesConfig.prefix;

    beforeEach(() => {
      requestTest = agentTest.get(baseURL);
    });

    it('should empty array if Avaliacoes not found', async () => {
      await requestTest.expect(200, []);
    });

    it('should array of Avaliacao on success', async () => {
      const manyAvaliacaoEntity = await Promise.all([
        mockInsertAvaliacaoEntity(),
        mockInsertAvaliacaoEntity(),
        mockInsertAvaliacaoEntity(),
        mockInsertAvaliacaoEntity(),
      ]);

      await requestTest.expect(200).expect(({ body }) => {
        expect(body).toEqual(
          expect.arrayContaining(
            manyAvaliacaoEntity.map((avaliacaoEntity) => ({
              ...avaliacaoEntity,
              nota: avaliacaoEntity.nota.toString(),
              criadoEm: expect.any(String),
              atualizadoEm: expect.any(String),
            })),
          ),
        );
      });
    });
  });
});
