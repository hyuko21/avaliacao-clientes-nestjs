import { ErrorSchema } from '@/swagger/schemas';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
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
import { IColaboradoresService } from '#/colaboradores/protocols/colaboradores.service.interface';
import { ColaboradoresProvider } from '#/colaboradores/providers/colaboradores.providers.enum';
import { ILojasService } from '#/lojas/protocols/lojas.service.interface';
import { LojasProvider } from '#/lojas/providers/lojas.providers.enum';
import { TransacoesConfig } from './config/transacoes.config';
import { AddTransacaoDTO } from './dtos/add-transacao.dto';
import { IdTransacaoDTO } from './dtos/id-transacao.dto';
import { ModifyTransacaoDTO } from './dtos/modify-transacao.dto';
import { TransacaoDTO } from './dtos/transacao.dto';
import { ITransacoesService } from './protocols/transacoes.service.interface';
import { TransacoesProvider } from './providers/transacoes.providers.enum';

@ApiTags(TransacoesConfig.name)
@Controller(TransacoesConfig.prefix)
export class TransacoesController {
  constructor(
    @Inject(TransacoesProvider.TRANSACOES_SERVICE)
    private readonly transacoesService: ITransacoesService,
    @Inject(ClientesProvider.CLIENTES_SERVICE)
    private readonly clientesService: IClientesService,
    @Inject(LojasProvider.LOJAS_SERVICE)
    private readonly lojasService: ILojasService,
    @Inject(ColaboradoresProvider.COLABORADORES_SERVICE)
    private readonly colaboradoresService: IColaboradoresService,
  ) {}

  @ApiCreatedResponse({ type: TransacaoDTO })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiInternalServerErrorResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@Body() dto: AddTransacaoDTO): Promise<TransacaoDTO> {
    const [clienteDTO, lojaDTO, colaboradorDTO] = await Promise.all([
      this.clientesService.loadById({ id: dto.idCliente }),
      this.lojasService.loadById({ id: dto.idLoja }),
      this.colaboradoresService.loadById({ id: dto.idColaborador }),
    ]);
    return this.transacoesService.add({
      ...dto,
      idCliente: clienteDTO.id,
      idLoja: lojaDTO.id,
      idColaborador: colaboradorDTO.id,
    });
  }

  @ApiOkResponse({ type: [TransacaoDTO] })
  @ApiInternalServerErrorResponse()
  @Get()
  list(): Promise<TransacaoDTO[]> {
    return this.transacoesService.list();
  }

  @ApiOkResponse({ type: TransacaoDTO })
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Put('/:id')
  async modify(
    @Param() idDto: IdTransacaoDTO,
    @Body() dto: ModifyTransacaoDTO,
  ): Promise<TransacaoDTO> {
    const _dto: ModifyTransacaoDTO = { ...dto };
    if (dto.idCliente) {
      const clienteDTO = await this.clientesService.loadById({
        id: dto.idCliente,
      });
      _dto.idCliente = clienteDTO.id;
    }
    if (dto.idLoja) {
      const lojaDTO = await this.lojasService.loadById({ id: dto.idLoja });
      _dto.idLoja = lojaDTO.id;
    }
    if (dto.idColaborador) {
      const colaboradorDTO = await this.colaboradoresService.loadById({
        id: dto.idColaborador,
      });
      _dto.idColaborador = colaboradorDTO.id;
    }
    return this.transacoesService.modify(idDto, _dto);
  }
}
