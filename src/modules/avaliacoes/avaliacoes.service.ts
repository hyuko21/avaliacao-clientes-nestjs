import { Injectable } from '@nestjs/common';
import { IAddAvaliacaoDTO } from './dtos/protocols/add-avaliacao.dto.interface';
import { IAvaliacaoDTO } from './dtos/protocols/avaliacao.dto.interface';
import { IAvaliacoesService } from './protocols/avaliacoes.service.interface';

@Injectable()
export class AvaliacoesService implements IAvaliacoesService {
  add(dto: IAddAvaliacaoDTO): Promise<IAvaliacaoDTO> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<IAvaliacaoDTO[]> {
    throw new Error('Method not implemented.');
  }
}
