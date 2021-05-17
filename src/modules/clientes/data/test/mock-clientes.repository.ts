import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { IClientesRepository } from '#/clientes/data/protocols/clientes.repository.interface';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import {
  mockClienteEntity,
  mockManyClienteEntity,
} from '#/clientes/data/entities/test/mock-cliente.entity';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';

export class ClientesRepositorySpy implements IClientesRepository {
  clienteEntity = mockClienteEntity();
  manyClienteEntity = mockManyClienteEntity();

  async add(dto: IAddClienteDTO): Promise<ClienteEntity> {
    return this.clienteEntity;
  }
  async list(): Promise<ClienteEntity[]> {
    return this.manyClienteEntity;
  }
  async modify(
    idDto: IIdClienteDTO,
    dto: IModifyClienteDTO,
  ): Promise<ClienteEntity> {
    return this.clienteEntity;
  }
  remove(idDto: IIdClienteDTO): Promise<void> {
    return;
  }
}
