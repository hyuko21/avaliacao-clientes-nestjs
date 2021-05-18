import { Inject, Injectable } from '@nestjs/common';
import { IAvaliacoesRepository } from './data/protocols/avaliacoes.repository.interface';
import { AvaliacaoDTO } from './dtos/avaliacao.dto';
import { IAddAvaliacaoDTO } from './dtos/protocols/add-avaliacao.dto.interface';
import { IAvaliacaoDTO } from './dtos/protocols/avaliacao.dto.interface';
import { IAvaliacoesService } from './protocols/avaliacoes.service.interface';
import { AvaliacoesProvider } from './providers/avaliacoes.providers.enum';

@Injectable()
export class AvaliacoesService implements IAvaliacoesService {
  constructor(
    @Inject(AvaliacoesProvider.AVALIACOES_REPOSITORY)
    private readonly avaliacoesRepository: IAvaliacoesRepository,
  ) {}

  async add(dto: IAddAvaliacaoDTO): Promise<IAvaliacaoDTO> {
    const avaliacaoEntity = await this.avaliacoesRepository.add(dto);
    return new AvaliacaoDTO(avaliacaoEntity);
  }
  async list(): Promise<IAvaliacaoDTO[]> {
    const manyAvaliacaoEntity = await this.avaliacoesRepository.list();
    return manyAvaliacaoEntity.map(
      (avaliacaoEntity) => new AvaliacaoDTO(avaliacaoEntity),
    );
  }
}
