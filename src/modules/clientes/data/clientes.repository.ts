import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { ClienteEntity } from './entities/cliente.entity';
import { IClientesRepository } from './protocols/clientes.repository.interface';

@EntityRepository(ClienteEntity)
export class ClientesRepository
  extends AbstractRepository<ClienteEntity>
  implements IClientesRepository
{
  add(dto: IAddClienteDTO): Promise<ClienteEntity> {
    return this.repository.save(dto);
  }
  list(): Promise<ClienteEntity[]> {
    throw new Error('Method not implemented.');
  }
}
