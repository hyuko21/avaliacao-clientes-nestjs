import { createTestConnection, truncate } from '@/test/db';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { mockInsertClienteEntity } from '#/clientes/data/entities/test/clientes.helpers';
import { mockInsertTransacaoEntity } from '#/transacoes/data/entities/test/transacoes.helpers';
import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';
import { AvaliacoesRepository } from './avaliacoes.repository';
import { mockAddAvaliacaoDTO } from '#/avaliacoes/dtos/test/mock-add-avaliacao.dto';
import { AvaliacaoEntity } from './entities/avaliacao.entity';
import { mockInsertAvaliacaoEntity } from './entities/test/avaliacoes.helpers';

describe('AvaliacoesRepository', () => {
  let repository: AvaliacoesRepository;

  beforeAll(async () => {
    await createTestConnection();
  });

  beforeEach(async () => {
    await truncate();
    repository = getCustomRepository(AvaliacoesRepository);
  });

  afterAll(async () => {
    await truncate();
    await getConnection().close();
  });

  describe('add()', () => {
    let dto: IAddAvaliacaoDTO;

    beforeEach(async () => {
      const clienteEntity = await mockInsertClienteEntity();
      const transacaoEntity = await mockInsertTransacaoEntity(clienteEntity);
      dto = {
        ...mockAddAvaliacaoDTO(),
        idCliente: clienteEntity.id,
        idTransacao: transacaoEntity.id,
      };
    });

    it('should insert new AvaliacaoEntity on success', async () => {
      await repository.add(dto);

      const countAvaliacaoEntity = await getRepository(AvaliacaoEntity).count({
        where: {
          nota: dto.nota,
          comentario: dto.comentario,
          idCliente: dto.idCliente,
          idTransacao: dto.idTransacao,
        },
      });

      expect(countAvaliacaoEntity).toBe(1);
    });

    it('should return AvaliacaoEntity on success', async () => {
      const result = await repository.add(dto);

      const actualAvaliacaoEntity = await getRepository(
        AvaliacaoEntity,
      ).findOne({
        where: {
          nota: dto.nota,
          comentario: dto.comentario,
          idCliente: dto.idCliente,
          idTransacao: dto.idTransacao,
        },
      });
      actualAvaliacaoEntity.nota = +actualAvaliacaoEntity.nota;

      expect(result).toEqual(actualAvaliacaoEntity);
    });
  });

  describe('list()', () => {
    it('should return empty array if entities not found', async () => {
      const result = await repository.list();

      expect(result).toEqual([]);
    });

    it('should return array of AvaliacaoEntity on success', async () => {
      const manyAvaliacaoEntity = await Promise.all([
        mockInsertAvaliacaoEntity(),
        mockInsertAvaliacaoEntity(),
        mockInsertAvaliacaoEntity(),
        mockInsertAvaliacaoEntity(),
      ]);

      const result = await repository.list();
      result.forEach((item) => (item.nota = +item.nota));

      expect(result).toEqual(expect.arrayContaining(manyAvaliacaoEntity));
    });
  });
});
