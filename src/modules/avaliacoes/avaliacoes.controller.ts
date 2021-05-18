import { ErrorSchema } from '@/swagger/schemas';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IClientesService } from '#/clientes/protocols/clientes.service.interface';
import { ClientesProvider } from '#/clientes/providers/clientes.providers.enum';
import { AddAvaliacaoDTO } from './dtos/add-avaliacao.dto';
import { ITransacoesService } from '#/transacoes/protocols/transacoes.service.interface';
import { TransacoesProvider } from '#/transacoes/providers/transacoes.providers.enum';
import { AvaliacoesConfig } from './config/avaliacoes.config';
import { AvaliacoesProvider } from './providers/avaliacoes.providers.enum';
import { IAvaliacoesService } from './protocols/avaliacoes.service.interface';
import { AvaliacaoDTO } from './dtos/avaliacao.dto';

@ApiTags(AvaliacoesConfig.name)
@Controller(AvaliacoesConfig.prefix)
export class AvaliacoesController {
  constructor(
    @Inject(AvaliacoesProvider.AVALIACOES_SERVICE)
    private readonly avaliacoesService: IAvaliacoesService,
    @Inject(TransacoesProvider.TRANSACOES_SERVICE)
    private readonly transacoesService: ITransacoesService,
    @Inject(ClientesProvider.CLIENTES_SERVICE)
    private readonly clientesService: IClientesService,
  ) {}

  @ApiCreatedResponse({ type: AvaliacaoDTO })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiInternalServerErrorResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Body() dto: AddAvaliacaoDTO): Promise<AvaliacaoDTO> {
    const [clienteDTO, transacaoDTO] = await Promise.all([
      this.clientesService.loadById({ id: dto.idCliente }),
      this.transacoesService.loadById({ id: dto.idTransacao }),
    ]);
    return this.avaliacoesService.add({
      ...dto,
      idCliente: clienteDTO.id,
      idTransacao: transacaoDTO.id,
    });
  }

  @ApiOkResponse({ type: [AvaliacaoDTO] })
  @ApiInternalServerErrorResponse()
  @Get()
  list(): Promise<AvaliacaoDTO[]> {
    return this.avaliacoesService.list();
  }
}
