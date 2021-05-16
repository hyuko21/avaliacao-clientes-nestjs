import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClienteDTO } from './dtos/cliente.dto';
import { AddClienteDTO } from './dtos/add-cliente.dto';
import { IClientesService } from './protocols/clientes.service.interface';
import { ClientesProvider } from './providers/clientes.providers.enum';

@Controller('clientes')
export class ClientesController {
  constructor(
    @Inject(ClientesProvider.CLIENTES_SERVICE)
    private readonly clientesService: IClientesService,
  ) {}

  @Post()
  add(@Body() dto: AddClienteDTO): Promise<ClienteDTO> {
    return this.clientesService.add(dto);
  }
}
