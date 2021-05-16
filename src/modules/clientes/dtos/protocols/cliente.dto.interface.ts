import { IAbstractDTO } from '@/common/dtos/protocols/abstract.dto.interface';

export interface IClienteDTO extends IAbstractDTO {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}
