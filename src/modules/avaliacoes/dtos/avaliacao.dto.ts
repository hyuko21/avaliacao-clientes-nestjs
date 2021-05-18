import { ApiProperty } from '@nestjs/swagger';
import { IAvaliacaoDTO } from './protocols/avaliacao.dto.interface';
import { AbstractDTO } from '@/common/dtos/abstract.dto';
import { AvaliacaoEntity } from '#/avaliacoes/data/entities/avaliacao.entity';

export class AvaliacaoDTO extends AbstractDTO implements IAvaliacaoDTO {
  @ApiProperty()
  nota: number;
  @ApiProperty({ nullable: true })
  comentario?: string;
  @ApiProperty()
  idCliente: string;
  @ApiProperty()
  idTransacao: string;

  constructor(entity: AvaliacaoEntity) {
    super(entity);
    this.nota = entity.nota;
    this.comentario = entity.comentario;
    this.idCliente = entity.idCliente;
    this.idTransacao = entity.idTransacao;
  }
}
