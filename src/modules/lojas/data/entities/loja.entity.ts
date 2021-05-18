import { AbstractEntity } from '@/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('lojas')
export class LojaEntity extends AbstractEntity {
  @Column()
  nome: string;
}
