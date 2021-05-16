import { IClienteDTO } from '#/clientes/dtos/protocols/cliente.dto.interface';
import { IClientesService } from '#/clientes/protocols/clientes.service.interface';
import { mockClienteDTO } from '#/clientes/dtos/test/mock-cliente.dto';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';

export class ClientesServiceSpy implements IClientesService {
  clienteDTO = mockClienteDTO();

  async add(dto: IAddClienteDTO): Promise<IClienteDTO> {
    return this.clienteDTO;
  }
}
