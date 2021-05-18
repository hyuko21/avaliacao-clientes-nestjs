import Faker from 'faker';
import { createTestConnection, truncate } from '@/test/db';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { mockAddClienteDTO } from '#/clientes/dtos/test/mock-add-cliente.dto';
import { ClientesRepository } from './clientes.repository';
import { ClienteEntity } from './entities/cliente.entity';
import {
  mockClienteEntity,
  mockManyClienteEntity,
} from './entities/test/mock-cliente.entity';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';
import { mockIdClienteDTO } from '#/clientes/dtos/test/mock-id-cliente.dto';
import { mockModifyClienteDTO } from '#/clientes/dtos/test/mock-modify-cliente.dto';
import { NotFoundException } from '@nestjs/common';

describe('ClientesRepository', () => {
  let repository: ClientesRepository;

  beforeAll(async () => {
    await createTestConnection();
  });

  beforeEach(async () => {
    await truncate();
    repository = getCustomRepository(ClientesRepository);
  });

  afterAll(async () => {
    await truncate();
    await getConnection().close();
  });

  describe('add()', () => {
    let dto: IAddClienteDTO;

    beforeEach(() => {
      dto = mockAddClienteDTO();
    });

    it('should insert new ClienteEntity on success', async () => {
      await repository.add(dto);

      const countClienteEntity = await getRepository(ClienteEntity).count({
        where: {
          nome: dto.nome,
          email: dto.email,
          telefone: dto.telefone,
          cpf: dto.cpf,
        },
      });

      expect(countClienteEntity).toBe(1);
    });

    it('should return ClienteEntity on success', async () => {
      const result = await repository.add(dto);

      const actualClienteEntity = await getRepository(ClienteEntity).findOne({
        where: {
          nome: dto.nome,
          email: dto.email,
          telefone: dto.telefone,
          cpf: dto.cpf,
        },
      });

      expect(result).toEqual(actualClienteEntity);
    });
  });

  describe('list()', () => {
    it('should return empty array if entities not found', async () => {
      const result = await repository.list();

      expect(result).toEqual([]);
    });

    it('should return array of ClienteEntity on success', async () => {
      const manyClienteEntity = await getRepository(ClienteEntity).save(
        mockManyClienteEntity(),
      );

      const result = await repository.list();

      expect(result).toEqual(manyClienteEntity);
    });
  });

  describe('modify()', () => {
    let idDto: IIdClienteDTO, dto: IModifyClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
      dto = mockModifyClienteDTO();
    });

    it('should throw NotFoundException if ClienteEntity not found with idDto', async () => {
      const promise = repository.modify(idDto, dto);

      await expect(promise).rejects.toThrowError(
        new NotFoundException(undefined, 'Cliente Not Found'),
      );
    });

    describe('when ClienteEntity exists', () => {
      let clienteEntity: ClienteEntity;

      beforeEach(async () => {
        clienteEntity = await getRepository(ClienteEntity).save(
          mockClienteEntity(),
        );
        idDto.id = clienteEntity.id;
      });

      it('should modify ClienteEntity data on success', async () => {
        await repository.modify(idDto, dto);

        const actualClienteEntity = await getRepository(ClienteEntity).findOne({
          where: { id: clienteEntity.id },
        });

        expect(actualClienteEntity).toEqual(expect.objectContaining(dto));
      });

      it('should return ClienteEntity on success', async () => {
        const result = await repository.modify(idDto, dto);

        const actualClienteEntity = await getRepository(ClienteEntity).findOne({
          where: { id: idDto.id },
        });

        expect(result).toEqual(actualClienteEntity);
      });
    });
  });

  describe('remove()', () => {
    let idDto: IIdClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
    });

    it('should throw NotFoundException if ClienteEntity not found with idDto', async () => {
      const promise = repository.remove(idDto);

      await expect(promise).rejects.toThrowError(
        new NotFoundException(undefined, 'Cliente Not Found'),
      );
    });

    describe('when ClienteEntity exists', () => {
      let manyClienteEntity: ClienteEntity[];

      beforeEach(async () => {
        manyClienteEntity = await getRepository(ClienteEntity).save(
          mockManyClienteEntity(),
        );
        idDto.id = Faker.random.arrayElement(manyClienteEntity).id;
      });

      it('should remove correct ClienteEntity on success', async () => {
        await repository.remove(idDto);

        const countClienteEntity = await getRepository(ClienteEntity).count({
          where: { id: idDto.id },
        });

        expect(countClienteEntity).toBe(0);
      });
    });
  });

  describe('loadById()', () => {
    let idDto: IIdClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
    });

    it('should return throw NotFoundException if ClienteEntity not found', async () => {
      const promise = repository.loadById(idDto);

      await expect(promise).rejects.toThrowError(
        new NotFoundException(undefined, 'Cliente Not Found'),
      );
    });

    it('should return ClienteEntity on success', async () => {
      const clienteEntity = await getRepository(ClienteEntity).save({
        ...mockClienteEntity(),
        id: idDto.id,
      });

      const result = await repository.loadById(idDto);

      expect(result).toEqual(clienteEntity);
    });
  });
});
