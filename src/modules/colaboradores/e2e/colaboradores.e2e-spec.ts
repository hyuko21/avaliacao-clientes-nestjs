import Faker from 'faker';
import { CoreModule } from '@/config/core.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ColaboradoresModule } from '#/colaboradores/colaboradores.module';
import { mockNestApp } from '@/test/app';
import { truncate } from '@/test/db';
import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';
import { mockAddColaboradorDTO } from '#/colaboradores/dtos/test/mock-add-colaborador.dto';
import { ColaboradoresConfig } from '#/colaboradores/config/colaboradores.config';
import { getRepository } from 'typeorm';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';
import {
  mockColaboradorEntity,
  mockManyColaboradorEntity,
} from '#/colaboradores/data/entities/test/mock-colaborador.entity';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';
import { mockModifyColaboradorDTO } from '#/colaboradores/dtos/test/mock-modify-colaborador.dto';

describe('Colaboradores e2e', () => {
  let app: INestApplication;
  let agentTest: request.SuperTest<request.Test>;
  let requestTest: request.Test;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, ColaboradoresModule],
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

  describe(`POST ${ColaboradoresConfig.prefix}`, () => {
    const baseURL = ColaboradoresConfig.prefix;
    let requestBody: IAddColaboradorDTO;

    beforeEach(() => {
      requestTest = agentTest.post(baseURL);
      requestBody = mockAddColaboradorDTO();
      requestTest.send(requestBody);
    });

    it('should create new Colaborador on success', async () => {
      await requestTest.expect(201);
    });
  });

  describe(`GET ${ColaboradoresConfig.prefix}`, () => {
    const baseURL = ColaboradoresConfig.prefix;

    beforeEach(() => {
      requestTest = agentTest.get(baseURL);
    });

    it('should empty array if Colaboradores not found', async () => {
      await requestTest.expect(200, []);
    });

    it('should array of Colaborador on success', async () => {
      const manyColaboradorEntity = await getRepository(ColaboradorEntity).save(
        mockManyColaboradorEntity(),
      );

      await requestTest.expect(200).expect(({ body }) => {
        expect(body).toEqual(
          manyColaboradorEntity.map((colaboradorEntity) => ({
            ...colaboradorEntity,
            criadoEm: expect.any(String),
            atualizadoEm: expect.any(String),
          })),
        );
      });
    });
  });

  describe(`PUT ${ColaboradoresConfig.prefix}/:id`, () => {
    const baseURL = (idColaborador: string) =>
      `${ColaboradoresConfig.prefix}/${idColaborador}`;

    it('should return 400 if param :id is malformed', async () => {
      const invalidIdColaborador = Faker.random.word();

      await agentTest.put(baseURL(invalidIdColaborador)).expect(400, {
        statusCode: 400,
        message: ['id must be a UUID'],
        error: 'Bad Request',
      });
    });

    it('should return 404 if Colaborador not found', async () => {
      const randomIdColaborador = Faker.datatype.uuid();

      await agentTest.put(baseURL(randomIdColaborador)).expect(404, {
        statusCode: 404,
        message: 'Not Found',
      });
    });

    describe('when Colaborador exists', () => {
      let colaboradorEntity: ColaboradorEntity;

      beforeEach(async () => {
        colaboradorEntity = await getRepository(ColaboradorEntity).save(
          mockColaboradorEntity(),
        );
        requestTest = agentTest.put(baseURL(colaboradorEntity.id));
      });

      it('should return 200 if body is empty', async () => {
        await requestTest.expect(200).expect(({ body }) => {
          expect(body).toEqual({
            ...colaboradorEntity,
            criadoEm: expect.any(String),
            atualizadoEm: expect.any(String),
          });
        });
      });

      describe('when body is provided', () => {
        let requestBody: IModifyColaboradorDTO;

        beforeEach(() => {
          requestBody = mockModifyColaboradorDTO();
        });

        it('should return 200 (with modifications) on success', async () => {
          await requestTest
            .send(requestBody)
            .expect(200)
            .expect(({ body }) => {
              expect(body).toEqual({
                id: colaboradorEntity.id,
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
