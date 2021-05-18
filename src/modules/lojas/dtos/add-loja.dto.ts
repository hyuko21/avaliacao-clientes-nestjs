import { IAddLojaDTO } from './protocols/add-loja.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AddLojaDTO implements IAddLojaDTO {
  @ApiProperty()
  nome: string;
}
