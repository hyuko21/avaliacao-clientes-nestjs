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
import { ColaboradorDTO } from './dtos/colaborador.dto';
import { AddColaboradorDTO } from './dtos/add-colaborador.dto';
import { IColaboradoresService } from './protocols/colaboradores.service.interface';
import { ColaboradoresProvider } from './providers/colaboradores.providers.enum';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ColaboradoresConfig } from './config/colaboradores.config';
import { ModifyColaboradorDTO } from './dtos/modify-colaborador.dto';
import { IdColaboradorDTO } from './dtos/id-colaborador.dto';
import { ErrorSchema } from '@/swagger/schemas';

@ApiTags(ColaboradoresConfig.name)
@Controller(ColaboradoresConfig.prefix)
export class ColaboradoresController {
  constructor(
    @Inject(ColaboradoresProvider.COLABORADORES_SERVICE)
    private readonly colaboradoresService: IColaboradoresService,
  ) {}

  @ApiCreatedResponse({ type: ColaboradorDTO })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @ApiInternalServerErrorResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  add(@Body() dto: AddColaboradorDTO): Promise<ColaboradorDTO> {
    return this.colaboradoresService.add(dto);
  }

  @ApiOkResponse({ type: [ColaboradorDTO] })
  @ApiInternalServerErrorResponse()
  @Get()
  list(): Promise<ColaboradorDTO[]> {
    return this.colaboradoresService.list();
  }

  @ApiOkResponse({ type: ColaboradorDTO })
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Put('/:id')
  modify(
    @Param() idDto: IdColaboradorDTO,
    @Body() dto: ModifyColaboradorDTO,
  ): Promise<ColaboradorDTO> {
    return this.colaboradoresService.modify(idDto, dto);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: ErrorSchema })
  @ApiBadRequestResponse({ schema: ErrorSchema })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() idDto: IdColaboradorDTO): Promise<void> {
    return this.colaboradoresService.remove(idDto);
  }
}
