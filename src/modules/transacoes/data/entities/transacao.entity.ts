import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transacoes')
export class TransacaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  valor: number;
  @Column({ name: 'criado_em' })
  criadoEm: Date;
  @Column({ name: 'id_cliente' })
  idCliente: string;
  @Column({ name: 'id_loja' })
  idLoja: string;
  @Column({ name: 'id_colaborador' })
  idColaborador: string;
  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
