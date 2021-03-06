import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import {
  mockManyTransacaoEntity,
  mockTransacaoEntity,
} from '#/transacoes/data/entities/test/mock-transacao.entity';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';
import { ITransacoesRepository } from '#/transacoes/data/protocols/transacoes.repository.interface';

export class TransacoesRepositorySpy implements ITransacoesRepository {
  transacaoEntity = mockTransacaoEntity();
  manyTransacaoEntity = mockManyTransacaoEntity();

  async add(dto: IAddTransacaoDTO): Promise<TransacaoEntity> {
    return this.transacaoEntity;
  }
  async list(): Promise<TransacaoEntity[]> {
    return this.manyTransacaoEntity;
  }
  async modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<TransacaoEntity> {
    return this.transacaoEntity;
  }
  async loadById(idDto: IIdTransacaoDTO): Promise<TransacaoEntity> {
    return this.transacaoEntity;
  }
}
