import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';
import { AvaliacaoEntity } from './entities/avaliacao.entity';
import { IAvaliacoesRepository } from './protocols/avaliacoes.repository.interface';

@EntityRepository(AvaliacaoEntity)
export class AvaliacoesRepository
  extends AbstractRepository<AvaliacaoEntity>
  implements IAvaliacoesRepository
{
  add(dto: IAddAvaliacaoDTO): Promise<AvaliacaoEntity> {
    return this.repository.save(dto);
  }
  list(): Promise<AvaliacaoEntity[]> {
    return this.repository.find();
  }
}
