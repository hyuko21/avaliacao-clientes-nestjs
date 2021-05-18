import { AbstractDTO } from '@/common/dtos/abstract.dto';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';
import { IColaboradorDTO } from './protocols/colaborador.dto.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ColaboradorDTO extends AbstractDTO implements IColaboradorDTO {
  @ApiProperty()
  nome: string;

  constructor(entity: ColaboradorEntity) {
    super(entity);
    this.nome = entity.nome;
  }
}
