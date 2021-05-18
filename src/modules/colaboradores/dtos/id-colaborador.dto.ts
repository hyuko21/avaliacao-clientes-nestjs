import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IIdColaboradorDTO } from './protocols/id-colaborador.dto.interface';

export class IdColaboradorDTO implements IIdColaboradorDTO {
  @ApiProperty()
  @IsUUID()
  id: string;
}
