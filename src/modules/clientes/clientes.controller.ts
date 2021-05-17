import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClienteDTO } from './dtos/cliente.dto';
import { AddClienteDTO } from './dtos/add-cliente.dto';
import { IClientesService } from './protocols/clientes.service.interface';
import { ClientesProvider } from './providers/clientes.providers.enum';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { ClientesConfig } from './config/clientes.config';

@ApiTags(ClientesConfig.name)
@Controller(ClientesConfig.prefix)
export class ClientesController {
  constructor(
    @Inject(ClientesProvider.CLIENTES_SERVICE)
    private readonly clientesService: IClientesService,
  ) {}

  @ApiCreatedResponse({ type: ClienteDTO })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  add(@Body() dto: AddClienteDTO): Promise<ClienteDTO> {
    return this.clientesService.add(dto);
  }
}
