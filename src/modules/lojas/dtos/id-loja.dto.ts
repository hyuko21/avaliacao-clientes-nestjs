import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IIdLojaDTO } from './protocols/id-loja.dto.interface';

export class IdLojaDTO implements IIdLojaDTO {
  @ApiProperty()
  @IsUUID()
  id: string;
}
