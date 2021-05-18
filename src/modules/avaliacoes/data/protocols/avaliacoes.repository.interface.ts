import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';
import { AvaliacaoEntity } from '#/avaliacoes/data/entities/avaliacao.entity';

export interface IAvaliacoesRepository {
  add(dto: IAddAvaliacaoDTO): Promise<AvaliacaoEntity>;
  list(): Promise<AvaliacaoEntity[]>;
}
