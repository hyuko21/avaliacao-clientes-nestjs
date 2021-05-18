import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import { TransacaoEntity } from './entities/transacao.entity';
import { ITransacoesRepository } from './protocols/transacoes.repository.interface';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(TransacaoEntity)
export class TransacoesRepository
  extends AbstractRepository<TransacaoEntity>
  implements ITransacoesRepository
{
  add(dto: IAddTransacaoDTO): Promise<TransacaoEntity> {
    return this.repository.save(dto);
  }
  async modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<TransacaoEntity> {
    const transacaoEntity = await this.loadById(idDto);
    await this.repository.save({
      id: idDto.id,
      ...dto,
    });
    return this.repository.findOne({ where: { id: transacaoEntity.id } });
  }
  async loadById(idDto: IIdTransacaoDTO): Promise<TransacaoEntity> {
    const transacaoEntity = await this.repository.findOne({
      where: { id: idDto.id },
    });
    if (!transacaoEntity) {
      throw new NotFoundException(undefined, 'Transacao Not Found');
    }
    return transacaoEntity;
  }
}
