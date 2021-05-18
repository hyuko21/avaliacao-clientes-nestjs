import { ApiProperty } from '@nestjs/swagger';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';
import { ITransacaoDTO } from './protocols/transacao.dto.interface';
import { AbstractDTO } from '@/common/dtos/abstract.dto';

export class TransacaoDTO extends AbstractDTO implements ITransacaoDTO {
  @ApiProperty()
  valor: number;
  @ApiProperty()
  data: Date;
  @ApiProperty()
  idCliente: string;
  @ApiProperty()
  idLoja: string;
  @ApiProperty()
  idColaborador: string;

  constructor(entity: TransacaoEntity) {
    super(entity);
    this.valor = entity.valor;
    this.data = entity.data;
    this.idCliente = entity.idCliente;
    this.idLoja = entity.idLoja;
    this.idColaborador = entity.idColaborador;
  }
}
