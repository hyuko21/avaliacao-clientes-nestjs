import { IAddColaboradorDTO } from './protocols/add-colaborador.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AddColaboradorDTO implements IAddColaboradorDTO {
  @ApiProperty()
  nome: string;
}
