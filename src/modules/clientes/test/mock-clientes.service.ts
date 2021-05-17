import { IClienteDTO } from '#/clientes/dtos/protocols/cliente.dto.interface';
import { IClientesService } from '#/clientes/protocols/clientes.service.interface';
import {
  mockClienteDTO,
  mockManyClienteDTO,
} from '#/clientes/dtos/test/mock-cliente.dto';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';

export class ClientesServiceSpy implements IClientesService {
  clienteDTO = mockClienteDTO();
  manyClienteDTO = mockManyClienteDTO();

  async add(dto: IAddClienteDTO): Promise<IClienteDTO> {
    return this.clienteDTO;
  }

  async list(): Promise<IClienteDTO[]> {
    return this.manyClienteDTO;
  }
}
