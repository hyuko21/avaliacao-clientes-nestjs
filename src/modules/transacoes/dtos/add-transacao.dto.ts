import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsUUID } from 'class-validator';
import { IAddTransacaoDTO } from './protocols/add-transacao.dto.interface';

export class AddTransacaoDTO implements IAddTransacaoDTO {
  @ApiProperty()
  @IsNumber()
  valor: number;

  @ApiProperty()
  @IsDateString()
  criadoEm: Date;

  @ApiProperty()
  @IsUUID()
  idCliente: string;

  @ApiProperty()
  @IsUUID()
  idLoja: string;

  @ApiProperty()
  @IsUUID()
  idColaborador: string;
}
