import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import { getRepository } from 'typeorm';
import { mockClienteEntity } from './mock-cliente.entity';

export function mockInsertClienteEntity(): Promise<ClienteEntity> {
  return getRepository(ClienteEntity).save(mockClienteEntity());
}
