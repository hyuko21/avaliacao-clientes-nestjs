import { IModifyClienteDTO } from './protocols/modify-cliente.dto.interface';
import { IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidCpf } from '#/clientes/validators/is-valid-cpf';
import { IsValidTelefone } from '#/clientes/validators/is-valid-telefone';

export class ModifyClienteDTO implements IModifyClienteDTO {
  @ApiProperty()
  nome?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsValidTelefone()
  telefone?: string;

  @ApiProperty()
  @IsOptional()
  @IsValidCpf()
  cpf?: string;
}
