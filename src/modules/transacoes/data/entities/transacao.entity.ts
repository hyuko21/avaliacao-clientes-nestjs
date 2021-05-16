import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('transacoes')
export class TransacaoEntity extends AbstractEntity {
  @Column()
  valor: number;
  @Column()
  data: Date;
  @Column({ name: 'id_cliente' })
  idCliente: string;
  @Column({ name: 'id_loja' })
  idLoja: string;
  @Column({ name: 'id_colaborador' })
  idColaborador: string;
}
