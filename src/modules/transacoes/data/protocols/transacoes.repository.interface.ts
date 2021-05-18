import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';

export interface ITransacoesRepository {
  add(dto: IAddTransacaoDTO): Promise<TransacaoEntity>;
  modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<TransacaoEntity>;
}
