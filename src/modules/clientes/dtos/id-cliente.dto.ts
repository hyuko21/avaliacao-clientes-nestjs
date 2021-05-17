import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IIdClienteDTO } from './protocols/id-cliente.dto.interface';

export class IdClienteDTO implements IIdClienteDTO {
  @ApiProperty()
  @IsUUID('4', { message: '$property must be a valid UUID v4' })
  id: string;
}
