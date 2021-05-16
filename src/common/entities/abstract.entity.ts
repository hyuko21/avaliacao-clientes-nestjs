import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
