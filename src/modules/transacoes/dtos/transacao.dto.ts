import { ApiProperty } from '@nestjs/swagger';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';
import { ITransacaoDTO } from './protocols/transacao.dto.interface';

export class TransacaoDTO implements ITransacaoDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  criadoEm: Date;
  @ApiProperty()
  idCliente: string;
  @ApiProperty()
  idLoja: string;
  @ApiProperty()
  idColaborador: string;
  @ApiProperty()
  atualizadoEm: Date;

  constructor(entity: TransacaoEntity) {
    this.id = entity.id;
    this.valor = entity.valor;
    this.criadoEm = entity.criadoEm;
    this.idCliente = entity.idCliente;
    this.idLoja = entity.idLoja;
    this.idColaborador = entity.idColaborador;
    this.atualizadoEm = entity.atualizadoEm;
  }
}
