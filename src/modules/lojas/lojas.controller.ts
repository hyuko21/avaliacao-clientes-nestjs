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
import { LojaDTO } from './dtos/loja.dto';
import { AddLojaDTO } from './dtos/add-loja.dto';
import { ILojasService } from './protocols/lojas.service.interface';
import { LojasProvider } from './providers/lojas.providers.enum';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { LojasConfig } from './config/lojas.config';
import { ModifyLojaDTO } from './dtos/modify-loja.dto';
import { IdLojaDTO } from './dtos/id-loja.dto';
import { ErrorSchema } from '@/swagger/schemas';

@ApiTags(LojasConfig.name)
@Controller(LojasConfig.prefix)
export class LojasController {
  constructor(
    @Inject(LojasProvider.LOJAS_SERVICE)
    private readonly lojasService: ILojasService,
  ) {}

  @ApiCreatedResponse({ type: LojaDTO })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @ApiInternalServerErrorResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  add(@Body() dto: AddLojaDTO): Promise<LojaDTO> {
    return this.lojasService.add(dto);
  }

  @ApiOkResponse({ type: [LojaDTO] })
  @ApiInternalServerErrorResponse()
  @Get()
  list(): Promise<LojaDTO[]> {
    return this.lojasService.list();
  }

  @ApiOkResponse({ type: LojaDTO })
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Put('/:id')
  modify(
    @Param() idDto: IdLojaDTO,
    @Body() dto: ModifyLojaDTO,
  ): Promise<LojaDTO> {
    return this.lojasService.modify(idDto, dto);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() idDto: IdLojaDTO): Promise<void> {
    return this.lojasService.remove(idDto);
  }
}
