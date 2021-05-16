import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('clientes')
export class ClienteEntity extends AbstractEntity {
  @Column()
  nome: string;
  @Column()
  email: string;
  @Column()
  telefone: string;
  @Column()
  cpf: string;
}
