import { createTestConnection, truncate } from '@/test/db';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { mockAddClienteDTO } from '#/clientes/dtos/test/mock-add-cliente.dto';
import { ClientesRepository } from './clientes.repository';
import { ClienteEntity } from './entities/cliente.entity';

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
});
