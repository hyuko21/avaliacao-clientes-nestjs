import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { IAddAvaliacaoDTO } from './protocols/add-avaliacao.dto.interface';

export class AddAvaliacaoDTO implements IAddAvaliacaoDTO {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(10)
  nota: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  comentario?: string;

  @ApiProperty()
  @IsUUID()
  idCliente: string;

  @ApiProperty()
  @IsUUID()
  idTransacao: string;
}
