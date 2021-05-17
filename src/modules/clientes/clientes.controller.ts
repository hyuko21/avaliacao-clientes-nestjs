import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteDTO } from './dtos/cliente.dto';
import { AddClienteDTO } from './dtos/add-cliente.dto';
import { IClientesService } from './protocols/clientes.service.interface';
import { ClientesProvider } from './providers/clientes.providers.enum';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ClientesConfig } from './config/clientes.config';
import { ModifyClienteDTO } from './dtos/modify-cliente.dto';
import { IdClienteDTO } from './dtos/id-cliente.dto';

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

  @ApiOkResponse({ type: [ClienteDTO] })
  @Get()
  list(): Promise<ClienteDTO[]> {
    return this.clientesService.list();
  }

  @ApiOkResponse({ type: ClienteDTO })
  @Put('/:id')
  modify(
    @Param() idDto: IdClienteDTO,
    @Body() dto: ModifyClienteDTO,
  ): Promise<ClienteDTO> {
    return this.clientesService.modify(idDto, dto);
  }

  @ApiNoContentResponse()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() idDto: IdClienteDTO): Promise<void> {
    return this.clientesService.remove(idDto);
  }
}
