import { IAddClienteDTO } from './protocols/add-cliente.dto.interface';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidCpf } from '#/clientes/validators/is-valid-cpf';
import { IsValidTelefone } from '#/clientes/validators/is-valid-telefone';

export class AddClienteDTO implements IAddClienteDTO {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsValidTelefone()
  telefone: string;

  @ApiProperty()
  @IsValidCpf()
  cpf: string;
}
