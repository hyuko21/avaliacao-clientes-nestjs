import { ITransacaoDTO } from '#/transacoes/dtos/protocols/transacao.dto.interface';
import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';

export interface ITransacoesService {
  add(dto: IAddTransacaoDTO): Promise<ITransacaoDTO>;
  list(): Promise<ITransacaoDTO[]>;
  modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<ITransacaoDTO>;
  loadById(idDto: IIdTransacaoDTO): Promise<ITransacaoDTO>;
}
