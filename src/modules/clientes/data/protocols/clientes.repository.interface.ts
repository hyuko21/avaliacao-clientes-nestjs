import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';

export interface IClientesRepository {
  add(dto: IAddClienteDTO): Promise<ClienteEntity>;
  list(): Promise<ClienteEntity[]>;
  modify(idDto: IIdClienteDTO, dto: IModifyClienteDTO): Promise<ClienteEntity>;
  remove(idDto: IIdClienteDTO): Promise<void>;
}
