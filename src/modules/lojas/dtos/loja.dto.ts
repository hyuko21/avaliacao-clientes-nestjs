import { AbstractDTO } from '@/common/dtos/abstract.dto';
import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import { ILojaDTO } from './protocols/loja.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class LojaDTO extends AbstractDTO implements ILojaDTO {
  @ApiProperty()
  nome: string;

  constructor(entity: LojaEntity) {
    super(entity);
    this.nome = entity.nome;
  }
}
