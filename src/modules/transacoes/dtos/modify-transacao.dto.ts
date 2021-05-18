import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { IModifyTransacaoDTO } from './protocols/modify-transacao.dto.interface';

export class ModifyTransacaoDTO implements IModifyTransacaoDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  valor?: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  data?: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  idCliente?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  idLoja?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  idColaborador?: string;
}
