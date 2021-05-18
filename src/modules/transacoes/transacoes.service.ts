import { Inject, Injectable } from '@nestjs/common';
import { ITransacoesRepository } from './data/protocols/transacoes.repository.interface';
import { IAddTransacaoDTO } from './dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from './dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from './dtos/protocols/modify-transacao.dto.interface';
import { ITransacaoDTO } from './dtos/protocols/transacao.dto.interface';
import { TransacaoDTO } from './dtos/transacao.dto';
import { ITransacoesService } from './protocols/transacoes.service.interface';
import { TransacoesProvider } from './providers/transacoes.providers.enum';

@Injectable()
export class TransacoesService implements ITransacoesService {
  constructor(
    @Inject(TransacoesProvider.TRANSACOES_REPOSITORY)
    private readonly transacoesRepository: ITransacoesRepository,
  ) {}

  async add(dto: IAddTransacaoDTO): Promise<ITransacaoDTO> {
    const transacaoEntity = await this.transacoesRepository.add(dto);
    return new TransacaoDTO(transacaoEntity);
  }
  async list(): Promise<ITransacaoDTO[]> {
    const manyTransacaoEntity = await this.transacoesRepository.list();
    return manyTransacaoEntity.map(
      (transacaoEntity) => new TransacaoDTO(transacaoEntity),
    );
  }
  async modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<ITransacaoDTO> {
    const transacaoEntity = await this.transacoesRepository.modify(idDto, dto);
    return new TransacaoDTO(transacaoEntity);
  }
}
