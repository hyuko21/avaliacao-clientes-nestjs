import { IClienteDTO } from '#/clientes/dtos/protocols/cliente.dto.interface';
import { IClientesService } from '#/clientes/protocols/clientes.service.interface';
import {
  mockClienteDTO,
  mockManyClienteDTO,
} from '#/clientes/dtos/test/mock-cliente.dto';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';

export class ClientesServiceSpy implements IClientesService {
  clienteDTO = mockClienteDTO();
  manyClienteDTO = mockManyClienteDTO();

  async add(dto: IAddClienteDTO): Promise<IClienteDTO> {
    return this.clienteDTO;
  }
  async list(): Promise<IClienteDTO[]> {
    return this.manyClienteDTO;
  }
  async modify(
    idDto: IIdClienteDTO,
    dto: IModifyClienteDTO,
  ): Promise<IClienteDTO> {
    return this.clienteDTO;
  }
  remove(idDto: IIdClienteDTO): Promise<void> {
    return;
  }
  async loadById(idDto: IIdClienteDTO): Promise<IClienteDTO> {
    return this.clienteDTO;
  }
}
