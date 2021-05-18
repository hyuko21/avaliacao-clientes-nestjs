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
import { mockInsertClienteEntity } from '@/modules/clientes/data/entities/test/clientes.helpers';
import { mockInsertLojaEntity } from '@/modules/lojas/data/entities/test/lojas.helpers';
import { mockInsertColaboradorEntity } from '@/modules/colaboradores/data/entities/test/colaboradores.helpers';

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
      requestTest.send(requestBody);
    });

    it.todo('should create new Transacao on success');
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
                id: transacaoEntity.id,
                ...requestBody,
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
