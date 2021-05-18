import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';
import { IAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/avaliacao.dto.interface';
import { IAvaliacoesService } from '#/avaliacoes/protocols/avaliacoes.service.interface';
import {
  mockAvaliacaoDTO,
  mockManyAvaliacaoDTO,
} from '#/avaliacoes/dtos/test/mock-avaliacao.dto';

export class AvaliacoesServiceSpy implements IAvaliacoesService {
  avaliacaoDTO = mockAvaliacaoDTO();
  manyAvaliacaoDTO = mockManyAvaliacaoDTO();

  async add(dto: IAddAvaliacaoDTO): Promise<IAvaliacaoDTO> {
    return this.avaliacaoDTO;
  }
  async list(): Promise<IAvaliacaoDTO[]> {
    return this.manyAvaliacaoDTO;
  }
}
