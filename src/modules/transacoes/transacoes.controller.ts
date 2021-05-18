import { ErrorSchema } from '@/swagger/schemas';
import {
  Body,
  Controller,
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
  ) {}

  @ApiCreatedResponse({ type: TransacaoDTO })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @ApiInternalServerErrorResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  add(@Body() dto: AddTransacaoDTO): Promise<TransacaoDTO> {
    return this.transacoesService.add(dto);
  }

  @ApiOkResponse({ type: TransacaoDTO })
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Put('/:id')
  modify(
    @Param() idDto: IdTransacaoDTO,
    @Body() dto: ModifyTransacaoDTO,
  ): Promise<TransacaoDTO> {
    return this.transacoesService.modify(idDto, dto);
  }
}
