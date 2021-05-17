import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { ClienteEntity } from './entities/cliente.entity';
import { IClientesRepository } from './protocols/clientes.repository.interface';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';

@EntityRepository(ClienteEntity)
export class ClientesRepository
  extends AbstractRepository<ClienteEntity>
  implements IClientesRepository
{
  add(dto: IAddClienteDTO): Promise<ClienteEntity> {
    return this.repository.save(dto);
  }
  list(): Promise<ClienteEntity[]> {
    return this.repository.find();
  }
  modify(idDto: IIdClienteDTO, dto: IModifyClienteDTO): Promise<ClienteEntity> {
    throw new Error('Method not implemented.');
  }
  remove(idDto: IIdClienteDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
