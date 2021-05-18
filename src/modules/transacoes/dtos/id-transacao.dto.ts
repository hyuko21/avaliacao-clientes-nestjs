import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IIdTransacaoDTO } from './protocols/id-transacao.dto.interface';

export class IdTransacaoDTO implements IIdTransacaoDTO {
  @ApiProperty()
  @IsUUID()
  id: string;
}
