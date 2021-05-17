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
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ClientesConfig } from './config/clientes.config';
import { ModifyClienteDTO } from './dtos/modify-cliente.dto';
import { IdClienteDTO } from './dtos/id-cliente.dto';
import { ErrorSchema } from '@/swagger/schemas';

@ApiTags(ClientesConfig.name)
@Controller(ClientesConfig.prefix)
export class ClientesController {
  constructor(
    @Inject(ClientesProvider.CLIENTES_SERVICE)
    private readonly clientesService: IClientesService,
  ) {}

  @ApiCreatedResponse({ type: ClienteDTO })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @ApiInternalServerErrorResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  add(@Body() dto: AddClienteDTO): Promise<ClienteDTO> {
    return this.clientesService.add(dto);
  }

  @ApiOkResponse({ type: [ClienteDTO] })
  @ApiInternalServerErrorResponse()
  @Get()
  list(): Promise<ClienteDTO[]> {
    return this.clientesService.list();
  }

  @ApiOkResponse({ type: ClienteDTO })
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Put('/:id')
  modify(
    @Param() idDto: IdClienteDTO,
    @Body() dto: ModifyClienteDTO,
  ): Promise<ClienteDTO> {
    return this.clientesService.modify(idDto, dto);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() idDto: IdClienteDTO): Promise<void> {
    return this.clientesService.remove(idDto);
  }
}
