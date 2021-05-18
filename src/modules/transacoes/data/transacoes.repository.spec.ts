import { createTestConnection, truncate } from '@/test/db';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { mockAddTransacaoDTO } from '#/transacoes/dtos/test/mock-add-transacao.dto';
import { TransacoesRepository } from './transacoes.repository';
import { TransacaoEntity } from './entities/transacao.entity';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import { mockIdTransacaoDTO } from '#/transacoes/dtos/test/mock-id-transacao.dto';
import { mockModifyTransacaoDTO } from '#/transacoes/dtos/test/mock-modify-transacao.dto';
import { NotFoundException } from '@nestjs/common';
import { mockInsertClienteEntity } from '#/clientes/data/entities/test/clientes.helpers';
import { mockInsertLojaEntity } from '#/lojas/data/entities/test/lojas.helpers';
import { mockColaboradorEntity } from '#/colaboradores/data/entities/test/mock-colaborador.entity';
import { mockInsertTransacaoEntity } from './entities/test/transacoes.helpers';
import { mockTransacaoEntity } from './entities/test/mock-transacao.entity';

describe('TransacoesRepository', () => {
  let repository: TransacoesRepository;

  beforeAll(async () => {
    await createTestConnection();
  });

  beforeEach(async () => {
    await truncate();
    repository = getCustomRepository(TransacoesRepository);
  });

  afterAll(async () => {
    await truncate();
    await getConnection().close();
  });

  describe('add()', () => {
    let dto: IAddTransacaoDTO;

    beforeEach(async () => {
      const [clienteEntity, lojaEntity, colaboradorEntity] = await Promise.all([
        mockInsertClienteEntity(),
        mockInsertLojaEntity(),
        mockColaboradorEntity(),
      ]);
      dto = {
        ...mockAddTransacaoDTO(),
        idCliente: clienteEntity.id,
        idLoja: lojaEntity.id,
        idColaborador: colaboradorEntity.id,
      };
    });

    it('should insert new TransacaoEntity on success', async () => {
      await repository.add(dto);

      const countTransacaoEntity = await getRepository(TransacaoEntity).count({
        where: {
          valor: dto.valor,
          data: dto.data,
          idCliente: dto.idCliente,
          idLoja: dto.idLoja,
          idColaborador: dto.idColaborador,
        },
      });

      expect(countTransacaoEntity).toBe(1);
    });

    it('should return TransacaoEntity on success', async () => {
      const result = await repository.add(dto);

      const actualTransacaoEntity = await getRepository(
        TransacaoEntity,
      ).findOne({
        where: {
          valor: dto.valor,
          data: dto.data,
          idCliente: dto.idCliente,
          idLoja: dto.idLoja,
          idColaborador: dto.idColaborador,
        },
      });
      actualTransacaoEntity.valor = +actualTransacaoEntity.valor;

      expect(result).toEqual(actualTransacaoEntity);
    });
  });

  describe('list()', () => {
    it('should return empty array if entities not found', async () => {
      const result = await repository.list();

      expect(result).toEqual([]);
    });

    it('should return array of TransacaoEntity on success', async () => {
      const manyTransacaoEntity = await Promise.all([
        mockInsertTransacaoEntity(),
        mockInsertTransacaoEntity(),
        mockInsertTransacaoEntity(),
        mockInsertTransacaoEntity(),
      ]);

      const result = await repository.list();
      result.forEach((item) => (item.valor = +item.valor));

      expect(result).toEqual(expect.arrayContaining(manyTransacaoEntity));
    });
  });

  describe('modify()', () => {
    let idDto: IIdTransacaoDTO, dto: IModifyTransacaoDTO;

    beforeEach(async () => {
      idDto = mockIdTransacaoDTO();
      dto = mockModifyTransacaoDTO();
    });

    it('should throw NotFoundException if TransacaoEntity not found with idDto', async () => {
      const promise = repository.modify(idDto, dto);

      await expect(promise).rejects.toThrowError(
        new NotFoundException(undefined, 'Transacao Not Found'),
      );
    });

    describe('when TransacaoEntity exists', () => {
      let transacaoEntity: TransacaoEntity;

      beforeEach(async () => {
        const [clienteEntity, lojaEntity, colaboradorEntity] =
          await Promise.all([
            mockInsertClienteEntity(),
            mockInsertLojaEntity(),
            mockColaboradorEntity(),
          ]);
        dto.idCliente = clienteEntity.id;
        dto.idLoja = lojaEntity.id;
        dto.idColaborador = colaboradorEntity.id;

        transacaoEntity = await mockInsertTransacaoEntity();
        idDto.id = transacaoEntity.id;
      });

      it('should modify TransacaoEntity data on success', async () => {
        await repository.modify(idDto, dto);

        const actualTransacaoEntity = await getRepository(
          TransacaoEntity,
        ).findOne({
          where: { id: transacaoEntity.id },
        });
        actualTransacaoEntity.valor = +actualTransacaoEntity.valor;

        expect(actualTransacaoEntity).toEqual(expect.objectContaining(dto));
      });

      it('should return TransacaoEntity on success', async () => {
        const result = await repository.modify(idDto, dto);

        const actualTransacaoEntity = await getRepository(
          TransacaoEntity,
        ).findOne({
          where: { id: idDto.id },
        });

        expect(result).toEqual(actualTransacaoEntity);
      });
    });
  });

  describe('loadById()', () => {
    let idDto: IIdTransacaoDTO;

    beforeEach(() => {
      idDto = mockIdTransacaoDTO();
    });

    it('should return throw NotFoundException if TransacaoEntity not found', async () => {
      const promise = repository.loadById(idDto);

      await expect(promise).rejects.toThrowError(
        new NotFoundException(undefined, 'Transacao Not Found'),
      );
    });

    it('should return TransacaoEntity on success', async () => {
      const [clienteEntity, lojaEntity, colaboradorEntity] = await Promise.all([
        mockInsertClienteEntity(),
        mockInsertLojaEntity(),
        mockColaboradorEntity(),
      ]);
      const transacaoEntity = await getRepository(TransacaoEntity).save({
        ...mockTransacaoEntity(),
        idCliente: clienteEntity.id,
        idLoja: lojaEntity.id,
        idColaborador: colaboradorEntity.id,
        id: idDto.id,
      });

      const result = await repository.loadById(idDto);
      result.valor = +result.valor;

      expect(result).toEqual(transacaoEntity);
    });
  });
});
