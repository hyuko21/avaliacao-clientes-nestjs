import { AbstractEntity } from '@/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('colaboradores')
export class ColaboradorEntity extends AbstractEntity {
  @Column()
  nome: string;
}
