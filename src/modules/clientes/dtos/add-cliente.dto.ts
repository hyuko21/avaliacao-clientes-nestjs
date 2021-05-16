import { IAddClienteDTO } from './protocols/add-cliente.dto.interface';

export class AddClienteDTO implements IAddClienteDTO {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}
