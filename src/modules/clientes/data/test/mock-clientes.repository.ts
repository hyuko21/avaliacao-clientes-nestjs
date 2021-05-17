import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { IClientesRepository } from '#/clientes/data/protocols/clientes.repository.interface';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import {
  mockClienteEntity,
  mockManyClienteEntity,
} from '#/clientes/data/entities/test/mock-cliente.entity';

export class ClientesRepositorySpy implements IClientesRepository {
  clienteEntity = mockClienteEntity();
  manyClienteEntity = mockManyClienteEntity();

  async add(dto: IAddClienteDTO): Promise<ClienteEntity> {
    return this.clienteEntity;
  }

  async list(): Promise<ClienteEntity[]> {
    return this.manyClienteEntity;
  }
}
