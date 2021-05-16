import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('lojas')
export class AvaliacaoEntity extends AbstractEntity {
  id: string;
  @Column()
  nome: string;
}
