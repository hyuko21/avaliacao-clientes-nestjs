import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';
import { AvaliacaoEntity } from '#/avaliacoes/data/entities/avaliacao.entity';
import {
  mockAvaliacaoEntity,
  mockManyAvaliacaoEntity,
} from '#/avaliacoes/data/entities/test/mock-avaliacao.entity';
import { IAvaliacoesRepository } from '#/avaliacoes/data/protocols/avaliacoes.repository.interface';

export class AvaliacoesRepositorySpy implements IAvaliacoesRepository {
  avaliacaoEntity = mockAvaliacaoEntity();
  manyAvaliacaoEntity = mockManyAvaliacaoEntity();

  async add(dto: IAddAvaliacaoDTO): Promise<AvaliacaoEntity> {
    return this.avaliacaoEntity;
  }
  async list(): Promise<AvaliacaoEntity[]> {
    return this.manyAvaliacaoEntity;
  }
}
