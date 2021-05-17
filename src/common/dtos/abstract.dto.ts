import { AbstractEntity } from '@/common/entities/abstract.entity';
import { IAbstractDTO } from './protocols/abstract.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AbstractDTO implements IAbstractDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  criadoEm: Date;
  @ApiProperty()
  atualizadoEm: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.criadoEm = entity.criadoEm;
    this.atualizadoEm = entity.atualizadoEm;
  }
}
