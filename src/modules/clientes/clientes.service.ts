import { Inject, Injectable } from '@nestjs/common';
import { IClienteDTO } from './dtos/protocols/cliente.dto.interface';
import { IAddClienteDTO } from './dtos/protocols/add-cliente.dto.interface';
import { IClientesService } from './protocols/clientes.service.interface';
import { ClientesProvider } from './providers/clientes.providers.enum';
import { IClientesRepository } from './data/protocols/clientes.repository.interface';
import { ClienteDTO } from './dtos/cliente.dto';
import { IModifyClienteDTO } from './dtos/protocols/modify-cliente.dto.interface';
import { IIdClienteDTO } from './dtos/protocols/id-cliente.dto.interface';

@Injectable()
export class ClientesService implements IClientesService {
  constructor(
    @Inject(ClientesProvider.CLIENTES_REPOSITORY)
    private readonly clientesRepository: IClientesRepository,
  ) {}

  async add(dto: IAddClienteDTO): Promise<IClienteDTO> {
    const clienteEntity = await this.clientesRepository.add(dto);
    return new ClienteDTO(clienteEntity);
  }
  async list(): Promise<IClienteDTO[]> {
    const manyClienteEntity = await this.clientesRepository.list();
    return manyClienteEntity.map(
      (clienteEntity) => new ClienteDTO(clienteEntity),
    );
  }
  modify(idDto: IIdClienteDTO, dto: IModifyClienteDTO): Promise<IClienteDTO> {
    throw new Error('Method not implemented.');
  }
  remove(dto: IIdClienteDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
