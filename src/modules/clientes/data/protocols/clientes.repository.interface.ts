import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';

export interface IClientesRepository {
  add(dto: IAddClienteDTO): Promise<ClienteEntity>;
  list(): Promise<ClienteEntity[]>;
}
