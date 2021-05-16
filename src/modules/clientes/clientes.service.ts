import { Injectable } from '@nestjs/common';
import { IClienteDTO } from './dtos/protocols/cliente.dto.interface';
import { IAddClienteDTO } from './dtos/protocols/add-cliente.dto.interface';
import { IClientesService } from './protocols/clientes.service.interface';

@Injectable()
export class ClientesService implements IClientesService {
  add(dto: IAddClienteDTO): Promise<IClienteDTO> {
    throw new Error('Method not implemented.');
  }
}
