import Faker from 'faker';
import { CoreModule } from '@/config/core.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { LojasModule } from '#/lojas/lojas.module';
import { mockNestApp } from '@/test/app';
import { truncate } from '@/test/db';
import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';
import { mockAddLojaDTO } from '#/lojas/dtos/test/mock-add-loja.dto';
import { LojasConfig } from '#/lojas/config/lojas.config';
import { getRepository } from 'typeorm';
import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import {
  mockLojaEntity,
  mockManyLojaEntity,
} from '#/lojas/data/entities/test/mock-loja.entity';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';
import { mockModifyLojaDTO } from '#/lojas/dtos/test/mock-modify-loja.dto';

describe('Lojas e2e', () => {
  let app: INestApplication;
  let agentTest: request.SuperTest<request.Test>;
  let requestTest: request.Test;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, LojasModule],
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

  describe(`POST ${LojasConfig.prefix}`, () => {
    const baseURL = LojasConfig.prefix;
    let requestBody: IAddLojaDTO;

    beforeEach(() => {
      requestTest = agentTest.post(baseURL);
      requestBody = mockAddLojaDTO();
      requestTest.send(requestBody);
    });

    it('should create new Loja on success', async () => {
      await requestTest.expect(201);
    });
  });

  describe(`GET ${LojasConfig.prefix}`, () => {
    const baseURL = LojasConfig.prefix;

    beforeEach(() => {
      requestTest = agentTest.get(baseURL);
    });

    it('should empty array if Lojas not found', async () => {
      await requestTest.expect(200, []);
    });

    it('should array of Loja on success', async () => {
      const manyLojaEntity = await getRepository(LojaEntity).save(
        mockManyLojaEntity(),
      );

      await requestTest.expect(200).expect(({ body }) => {
        expect(body).toEqual(
          manyLojaEntity.map((lojaEntity) => ({
            ...lojaEntity,
            criadoEm: expect.any(String),
            atualizadoEm: expect.any(String),
          })),
        );
      });
    });
  });

  describe(`PUT ${LojasConfig.prefix}/:id`, () => {
    const baseURL = (idLoja: string) => `${LojasConfig.prefix}/${idLoja}`;

    it('should return 400 if param :id is malformed', async () => {
      const invalidIdLoja = Faker.random.word();

      await agentTest.put(baseURL(invalidIdLoja)).expect(400, {
        statusCode: 400,
        message: ['id must be a UUID'],
        error: 'Bad Request',
      });
    });

    it('should return 404 if Loja not found', async () => {
      const randomIdLoja = Faker.datatype.uuid();

      await agentTest.put(baseURL(randomIdLoja)).expect(404, {
        statusCode: 404,
        message: 'Not Found',
      });
    });

    describe('when Loja exists', () => {
      let lojaEntity: LojaEntity;

      beforeEach(async () => {
        lojaEntity = await getRepository(LojaEntity).save(mockLojaEntity());
        requestTest = agentTest.put(baseURL(lojaEntity.id));
      });

      it('should return 200 if body is empty', async () => {
        await requestTest.expect(200).expect(({ body }) => {
          expect(body).toEqual({
            ...lojaEntity,
            criadoEm: expect.any(String),
            atualizadoEm: expect.any(String),
          });
        });
      });

      describe('when body is provided', () => {
        let requestBody: IModifyLojaDTO;

        beforeEach(() => {
          requestBody = mockModifyLojaDTO();
        });

        it('should return 200 (with modifications) on success', async () => {
          await requestTest
            .send(requestBody)
            .expect(200)
            .expect(({ body }) => {
              expect(body).toEqual({
                id: lojaEntity.id,
                ...requestBody,
                criadoEm: expect.any(String),
                atualizadoEm: expect.any(String),
              });
            });
        });
      });
    });
  });
});
