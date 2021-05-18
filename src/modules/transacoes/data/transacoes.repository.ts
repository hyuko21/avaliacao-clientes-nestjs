import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import { TransacaoEntity } from './entities/transacao.entity';
import { ITransacoesRepository } from './protocols/transacoes.repository.interface';

@EntityRepository(TransacaoEntity)
export class TransacoesRepository
  extends AbstractRepository<TransacaoEntity>
  implements ITransacoesRepository
{
  add(dto: IAddTransacaoDTO): Promise<TransacaoEntity> {
    throw new Error('Method not implemented.');
  }
  modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<TransacaoEntity> {
    throw new Error('Method not implemented.');
  }
}
