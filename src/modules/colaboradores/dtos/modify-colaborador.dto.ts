import { IModifyColaboradorDTO } from './protocols/modify-colaborador.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ModifyColaboradorDTO implements IModifyColaboradorDTO {
  @ApiProperty()
  nome?: string;
}
