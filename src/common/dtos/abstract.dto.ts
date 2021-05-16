import { AbstractEntity } from '@/common/entities/abstract.entity';
import { IAbstractDTO } from './protocols/abstract.dto.interface';

export class AbstractDTO implements IAbstractDTO {
  id: string;
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.criadoEm = entity.criadoEm;
    this.atualizadoEm = entity.atualizadoEm;
  }
}
