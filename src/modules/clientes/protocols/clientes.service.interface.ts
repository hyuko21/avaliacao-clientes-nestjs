import { IClienteDTO } from '#/clientes/dtos/protocols/cliente.dto.interface';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';

export interface IClientesService {
  add(dto: IAddClienteDTO): Promise<IClienteDTO>;
  list(): Promise<IClienteDTO[]>;
  modify(idDto: IIdClienteDTO, dto: IModifyClienteDTO): Promise<IClienteDTO>;
  remove(idDto: IIdClienteDTO): Promise<void>;
}
