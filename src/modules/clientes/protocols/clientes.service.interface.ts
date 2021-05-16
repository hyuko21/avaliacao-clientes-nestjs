import { IClienteDTO } from '#/clientes/dtos/protocols/cliente.dto.interface';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';

export interface IClientesService {
  add(dto: IAddClienteDTO): Promise<IClienteDTO>;
}
