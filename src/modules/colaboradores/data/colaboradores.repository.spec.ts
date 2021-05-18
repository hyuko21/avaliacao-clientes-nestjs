import Faker from 'faker';
import { createTestConnection, truncate } from '@/test/db';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';
import { mockAddColaboradorDTO } from '#/colaboradores/dtos/test/mock-add-colaborador.dto';
import { ColaboradoresRepository } from './colaboradores.repository';
import { ColaboradorEntity } from './entities/colaborador.entity';
import {
  mockColaboradorEntity,
  mockManyColaboradorEntity,
} from './entities/test/mock-colaborador.entity';
import { IIdColaboradorDTO } from '#/colaboradores/dtos/protocols/id-colaborador.dto.interface';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';
import { mockIdColaboradorDTO } from '#/colaboradores/dtos/test/mock-id-colaborador.dto';
import { mockModifyColaboradorDTO } from '#/colaboradores/dtos/test/mock-modify-colaborador.dto';
import { NotFoundException } from '@nestjs/common';

describe('ColaboradoresRepository', () => {
  let repository: ColaboradoresRepository;

  beforeAll(async () => {
    await createTestConnection();
  });

  beforeEach(async () => {
    await truncate();
    repository = getCustomRepository(ColaboradoresRepository);
  });

  afterAll(async () => {
    await truncate();
    await getConnection().close();
  });

  describe('add()', () => {
    let dto: IAddColaboradorDTO;

    beforeEach(() => {
      dto = mockAddColaboradorDTO();
    });

    it('should insert new ColaboradorEntity on success', async () => {
      await repository.add(dto);

      const countColaboradorEntity = await getRepository(ColaboradorEntity).count({
        where: {
          nome: dto.nome,
        }
      });

      expect(countColaboradorEntity).toBe(1);
    });

    it('should return ColaboradorEntity on success', async () => {
      const result = await repository.add(dto);

      const actualColaboradorEntity = await getRepository(ColaboradorEntity).findOne({
        where: {
          nome: dto.nome,
        }
      });

      expect(result).toEqual(actualColaboradorEntity);
    });
  });

  describe('list()', () => {
    it('should return empty array if entities not found', async () => {
      const result = await repository.list();

      expect(result).toEqual([]);
    });

    it('should return array of ColaboradorEntity on success', async () => {
      const manyColaboradorEntity = await getRepository(ColaboradorEntity).save(
        mockManyColaboradorEntity(),
      );

      const result = await repository.list();

      expect(result).toEqual(manyColaboradorEntity);
    });
  });

  describe('modify()', () => {
    let idDto: IIdColaboradorDTO, dto: IModifyColaboradorDTO;

    beforeEach(() => {
      idDto = mockIdColaboradorDTO();
      dto = mockModifyColaboradorDTO();
    });

    it('should throw NotFoundException if ColaboradorEntity not found with idDto', async () => {
      const promise = repository.modify(idDto, dto);

      await expect(promise).rejects.toThrowError(new NotFoundException());
    });

    describe('when ColaboradorEntity exists', () => {
      let colaboradorEntity: ColaboradorEntity;

      beforeEach(async () => {
        colaboradorEntity = await getRepository(ColaboradorEntity).save(
          mockColaboradorEntity(),
        );
        idDto.id = colaboradorEntity.id;
      });

      it('should modify ColaboradorEntity data on success', async () => {
        await repository.modify(idDto, dto);

        const actualColaboradorEntity = await getRepository(ColaboradorEntity).findOne({
          where: { id: colaboradorEntity.id },
        });

        expect(actualColaboradorEntity).toEqual(expect.objectContaining(dto));
      });

      it('should return ColaboradorEntity on success', async () => {
        const result = await repository.modify(idDto, dto);

        const actualColaboradorEntity = await getRepository(ColaboradorEntity).findOne({
          where: { id: idDto.id },
        });

        expect(result).toEqual(actualColaboradorEntity);
      });
    });
  });

  describe('remove()', () => {
    let idDto: IIdColaboradorDTO;

    beforeEach(() => {
      idDto = mockIdColaboradorDTO();
    });

    it('should throw NotFoundException if ColaboradorEntity not found with idDto', async () => {
      const promise = repository.remove(idDto);

      await expect(promise).rejects.toThrowError(new NotFoundException());
    });

    describe('when ColaboradorEntity exists', () => {
      let manyColaboradorEntity: ColaboradorEntity[];

      beforeEach(async () => {
        manyColaboradorEntity = await getRepository(ColaboradorEntity).save(
          mockManyColaboradorEntity(),
        );
        idDto.id = Faker.random.arrayElement(manyColaboradorEntity).id;
      });

      it('should remove correct ColaboradorEntity on success', async () => {
        await repository.remove(idDto);

        const countColaboradorEntity = await getRepository(ColaboradorEntity).count({
          where: { id: idDto.id },
        });

        expect(countColaboradorEntity).toBe(0);
      });
    });
  });
});
