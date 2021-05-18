import { IModifyLojaDTO } from './protocols/modify-loja.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ModifyLojaDTO implements IModifyLojaDTO {
  @ApiProperty()
  nome?: string;
}
