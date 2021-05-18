import Faker from 'faker';
import { CoreModule } from '@/config/core.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { mockNestApp } from '@/test/app';
import { truncate } from '@/test/db';
import { TransacoesModule } from '#/transacoes/transacoes.module';
import { TransacoesConfig } from '#/transacoes/config/transacoes.config';
import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { mockAddTransacaoDTO } from '#/transacoes/dtos/test/mock-add-transacao.dto';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';
import { mockInsertTransacaoEntity } from '#/transacoes/data/entities/test/transacoes.helpers';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import { mockModifyTransacaoDTO } from '#/transacoes/dtos/test/mock-modify-transacao.dto';
import { mockInsertClienteEntity } from '#/clientes/data/entities/test/clientes.helpers';
import { mockInsertLojaEntity } from '#/lojas/data/entities/test/lojas.helpers';
import { mockInsertColaboradorEntity } from '#/colaboradores/data/entities/test/colaboradores.helpers';

describe('Transacoes e2e', () => {
  let app: INestApplication;
  let agentTest: request.SuperTest<request.Test>;
  let requestTest: request.Test;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, TransacoesModule],
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

  describe(`POST ${TransacoesConfig.prefix}`, () => {
    const baseURL = TransacoesConfig.prefix;
    let requestBody: IAddTransacaoDTO;

    beforeEach(() => {
      requestTest = agentTest.post(baseURL);
      requestBody = mockAddTransacaoDTO();
    });

    it('should return 400 if body.valor is less than 100', async () => {
      requestBody.valor = 99;

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['valor must not be less than 100'],
        error: 'Bad Request',
      });
    });

    it('should return 400 if body.valor is not valid number', async () => {
      requestBody.valor = (<unknown>Faker.datatype.string()) as number;

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: [
          'valor must not be less than 100',
          'valor must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
      });
    });

    it('should return 400 if body.data is not valid date string', async () => {
      requestBody.data = (<unknown>Faker.datatype.number()) as Date;

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['data must be a valid ISO 8601 date string'],
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

    it('should return 400 if body.idLoja is malformed', async () => {
      requestBody.idLoja = Faker.datatype.string();

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['idLoja must be a UUID'],
        error: 'Bad Request',
      });
    });

    it('should return 400 if body.idColaborador is malformed', async () => {
      requestBody.idColaborador = Faker.datatype.string();

      await requestTest.send(requestBody).expect(400, {
        statusCode: 400,
        message: ['idColaborador must be a UUID'],
        error: 'Bad Request',
      });
    });

    describe('when body is valid', () => {
      describe('if Cliente not exists', () => {
        beforeEach(async () => {
          const [lojaEntity, colaboradorEntity] = await Promise.all([
            mockInsertLojaEntity(),
            mockInsertColaboradorEntity(),
          ]);
          requestBody.idLoja = lojaEntity.id;
          requestBody.idColaborador = colaboradorEntity.id;
          requestTest.send(requestBody);
        });

        it('should return 404 if Cliente not found', async () => {
          await requestTest.expect(404, {
            statusCode: 404,
            message: 'Cliente Not Found',
          });
        });
      });

      describe('if Loja not exists', () => {
        beforeEach(async () => {
          const [colaboradorEntity, clienteEntity] = await Promise.all([
            mockInsertColaboradorEntity(),
            mockInsertClienteEntity(),
          ]);
          requestBody.idCliente = clienteEntity.id;
          requestBody.idColaborador = colaboradorEntity.id;
          requestTest.send(requestBody);
        });

        it('should return 404 if Loja not found', async () => {
          await requestTest.expect(404, {
            statusCode: 404,
            message: 'Loja Not Found',
          });
        });
      });

      describe('if Colaborador not exists', () => {
        beforeEach(async () => {
          const [clienteEntity, lojaEntity] = await Promise.all([
            mockInsertClienteEntity(),
            mockInsertLojaEntity(),
          ]);
          requestBody.idCliente = clienteEntity.id;
          requestBody.idLoja = lojaEntity.id;
          requestTest.send(requestBody);
        });

        it('should return 404 if Colaborador not found', async () => {
          await requestTest.expect(404, {
            statusCode: 404,
            message: 'Colaborador Not Found',
          });
        });
      });

      it('should create new Transacao on success', async () => {
        const [clienteEntity, lojaEntity, colaboradorEntity] =
          await Promise.all([
            mockInsertClienteEntity(),
            mockInsertLojaEntity(),
            mockInsertColaboradorEntity(),
          ]);
        requestBody.idCliente = clienteEntity.id;
        requestBody.idLoja = lojaEntity.id;
        requestBody.idColaborador = colaboradorEntity.id;

        await requestTest
          .send(requestBody)
          .expect(201)
          .expect(({ body }) => {
            expect(body).toEqual({
              ...requestBody,
              id: expect.any(String),
              data: expect.any(String),
              criadoEm: expect.any(String),
              atualizadoEm: expect.any(String),
            });
          });
      });
    });
  });

  describe(`PUT ${TransacoesConfig.prefix}/:id`, () => {
    const baseURL = (idTransacao: string) =>
      `${TransacoesConfig.prefix}/${idTransacao}`;

    it('should return 400 if param :id is malformed', async () => {
      const invalidIdTransacao = Faker.random.word();

      await agentTest.put(baseURL(invalidIdTransacao)).expect(400, {
        statusCode: 400,
        message: ['id must be a UUID'],
        error: 'Bad Request',
      });
    });

    it('should return 404 if Transacao not found', async () => {
      const randomIdTransacao = Faker.datatype.uuid();

      await agentTest.put(baseURL(randomIdTransacao)).expect(404, {
        statusCode: 404,
        message: 'Transacao Not Found',
      });
    });

    describe('when Transacao exists', () => {
      let transacaoEntity: TransacaoEntity;

      beforeEach(async () => {
        transacaoEntity = await mockInsertTransacaoEntity();
        requestTest = agentTest.put(baseURL(transacaoEntity.id));
      });

      it('should return 200 if body is empty', async () => {
        await requestTest.expect(200).expect(({ body }) => {
          expect(body).toEqual({
            ...transacaoEntity,
            valor: transacaoEntity.valor.toString(),
            data: expect.any(String),
            criadoEm: expect.any(String),
            atualizadoEm: expect.any(String),
          });
        });
      });

      describe('when body is provided', () => {
        let requestBody: IModifyTransacaoDTO;

        beforeEach(async () => {
          const [clienteEntity, lojaEntity, colaboradorEntity] =
            await Promise.all([
              mockInsertClienteEntity(),
              mockInsertLojaEntity(),
              mockInsertColaboradorEntity(),
            ]);
          requestBody = {
            ...mockModifyTransacaoDTO(),
            idCliente: clienteEntity.id,
            idLoja: lojaEntity.id,
            idColaborador: colaboradorEntity.id,
          };
        });

        it('should return 200 (with modifications) on success', async () => {
          await requestTest
            .send(requestBody)
            .expect(200)
            .expect(({ body }) => {
              expect(body).toEqual({
                ...requestBody,
                id: transacaoEntity.id,
                valor: requestBody.valor.toString(),
                data: expect.any(String),
                criadoEm: expect.any(String),
                atualizadoEm: expect.any(String),
              });
            });
        });
      });
    });
  });
});
