import { Provider } from '@nestjs/common';
import { AvaliacoesService } from '#/avaliacoes/avaliacoes.service';
import { AvaliacoesProvider } from './avaliacoes.providers.enum';
import { Connection } from 'typeorm';
import { AvaliacoesRepository } from '#/avaliacoes/data/avaliacoes.repository';

export const avaliacoesServices: Provider[] = [
  {
    provide: AvaliacoesProvider.AVALIACOES_SERVICE,
    useClass: AvaliacoesService,
  },
];

export const avaliacoesProviders: Provider[] = [
  ...avaliacoesServices,
  {
    provide: AvaliacoesProvider.AVALIACOES_REPOSITORY,
    useFactory: (conn: Connection) =>
      conn.getCustomRepository(AvaliacoesRepository),
    inject: [Connection],
  },
];
