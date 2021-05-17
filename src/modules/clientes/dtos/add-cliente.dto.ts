import { IAddClienteDTO } from './protocols/add-cliente.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AddClienteDTO implements IAddClienteDTO {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  telefone: string;
  @ApiProperty()
  cpf: string;
}
