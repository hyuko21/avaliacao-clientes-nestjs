import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsUUID, Min } from 'class-validator';
import { IAddTransacaoDTO } from './protocols/add-transacao.dto.interface';

export class AddTransacaoDTO implements IAddTransacaoDTO {
  @ApiProperty()
  @IsNumber()
  @Min(100)
  valor: number;

  @ApiProperty()
  @IsDateString()
  data: Date;

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
