import Faker from 'faker';
import { createTestConnection, truncate } from '@/test/db';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';
import { mockAddLojaDTO } from '#/lojas/dtos/test/mock-add-loja.dto';
import { LojasRepository } from './lojas.repository';
import { LojaEntity } from './entities/loja.entity';
import {
  mockLojaEntity,
  mockManyLojaEntity,
} from './entities/test/mock-loja.entity';
import { IIdLojaDTO } from '#/lojas/dtos/protocols/id-loja.dto.interface';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';
import { mockIdLojaDTO } from '#/lojas/dtos/test/mock-id-loja.dto';
import { mockModifyLojaDTO } from '#/lojas/dtos/test/mock-modify-loja.dto';
import { NotFoundException } from '@nestjs/common';

describe('LojasRepository', () => {
  let repository: LojasRepository;

  beforeAll(async () => {
    await createTestConnection();
  });

  beforeEach(async () => {
    await truncate();
    repository = getCustomRepository(LojasRepository);
  });

  afterAll(async () => {
    await truncate();
    await getConnection().close();
  });

  describe('add()', () => {
    let dto: IAddLojaDTO;

    beforeEach(() => {
      dto = mockAddLojaDTO();
    });

    it('should insert new LojaEntity on success', async () => {
      await repository.add(dto);

      const countLojaEntity = await getRepository(LojaEntity).count({
        where: {
          nome: dto.nome,
        },
      });

      expect(countLojaEntity).toBe(1);
    });

    it('should return LojaEntity on success', async () => {
      const result = await repository.add(dto);

      const actualLojaEntity = await getRepository(LojaEntity).findOne({
        where: {
          nome: dto.nome,
        },
      });

      expect(result).toEqual(actualLojaEntity);
    });
  });

  describe('list()', () => {
    it('should return empty array if entities not found', async () => {
      const result = await repository.list();

      expect(result).toEqual([]);
    });

    it('should return array of LojaEntity on success', async () => {
      const manyLojaEntity = await getRepository(LojaEntity).save(
        mockManyLojaEntity(),
      );

      const result = await repository.list();

      expect(result).toEqual(manyLojaEntity);
    });
  });

  describe('modify()', () => {
    let idDto: IIdLojaDTO, dto: IModifyLojaDTO;

    beforeEach(() => {
      idDto = mockIdLojaDTO();
      dto = mockModifyLojaDTO();
    });

    it('should throw NotFoundException if LojaEntity not found with idDto', async () => {
      const promise = repository.modify(idDto, dto);

      await expect(promise).rejects.toThrowError(
        new NotFoundException(undefined, 'Loja Not Found'),
      );
    });

    describe('when LojaEntity exists', () => {
      let lojaEntity: LojaEntity;

      beforeEach(async () => {
        lojaEntity = await getRepository(LojaEntity).save(mockLojaEntity());
        idDto.id = lojaEntity.id;
      });

      it('should modify LojaEntity data on success', async () => {
        await repository.modify(idDto, dto);

        const actualLojaEntity = await getRepository(LojaEntity).findOne({
          where: { id: lojaEntity.id },
        });

        expect(actualLojaEntity).toEqual(expect.objectContaining(dto));
      });

      it('should return LojaEntity on success', async () => {
        const result = await repository.modify(idDto, dto);

        const actualLojaEntity = await getRepository(LojaEntity).findOne({
          where: { id: idDto.id },
        });

        expect(result).toEqual(actualLojaEntity);
      });
    });
  });

  describe('remove()', () => {
    let idDto: IIdLojaDTO;

    beforeEach(() => {
      idDto = mockIdLojaDTO();
    });

    it('should throw NotFoundException if LojaEntity not found with idDto', async () => {
      const promise = repository.remove(idDto);

      await expect(promise).rejects.toThrowError(
        new NotFoundException(undefined, 'Loja Not Found'),
      );
    });

    describe('when LojaEntity exists', () => {
      let manyLojaEntity: LojaEntity[];

      beforeEach(async () => {
        manyLojaEntity = await getRepository(LojaEntity).save(
          mockManyLojaEntity(),
        );
        idDto.id = Faker.random.arrayElement(manyLojaEntity).id;
      });

      it('should remove correct LojaEntity on success', async () => {
        await repository.remove(idDto);

        const countLojaEntity = await getRepository(LojaEntity).count({
          where: { id: idDto.id },
        });

        expect(countLojaEntity).toBe(0);
      });
    });
  });
});
