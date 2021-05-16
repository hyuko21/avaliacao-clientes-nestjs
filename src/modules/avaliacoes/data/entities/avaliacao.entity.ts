import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('avaliacoes')
export class AvaliacaoEntity extends AbstractEntity {
  @Column()
  nota: number;
  @Column({ nullable: true })
  comentario?: string;
  @Column({ name: 'id_cliente' })
  idCliente: string;
  @Column({ name: 'id_transacao' })
  idTransacao: string;
}
