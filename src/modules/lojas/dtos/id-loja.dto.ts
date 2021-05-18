import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IIdLojaDTO } from './protocols/id-loja.dto.interface';

export class IdLojaDTO implements IIdLojaDTO {
  @ApiProperty()
  @IsUUID('4', { message: '$property must be a valid UUID v4' })
  id: string;
}
