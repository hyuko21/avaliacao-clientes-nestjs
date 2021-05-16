import { AbstractDTO } from '@/common/dtos/abstract.dto';
import { IClienteDTO } from './protocols/cliente.dto.interface';

export class ClienteDTO extends AbstractDTO implements IClienteDTO {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}
