import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';
import { IAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/avaliacao.dto.interface';

export interface IAvaliacoesService {
  add(dto: IAddAvaliacaoDTO): Promise<IAvaliacaoDTO>;
  list(): Promise<IAvaliacaoDTO[]>;
}
