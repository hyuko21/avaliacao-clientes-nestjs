import { AbstractDTO } from '@/common/dtos/abstract.dto';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import { IClienteDTO } from './protocols/cliente.dto.interface';

export class ClienteDTO extends AbstractDTO implements IClienteDTO {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;

  constructor(entity: ClienteEntity) {
    super(entity);
    this.nome = entity.nome;
    this.email = entity.email;
    this.telefone = entity.telefone;
    this.cpf = entity.cpf;
  }
}
