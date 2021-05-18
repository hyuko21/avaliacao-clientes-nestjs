import { Provider } from '@nestjs/common';
import { AvaliacoesService } from '#/avaliacoes/avaliacoes.service';
import { AvaliacoesProvider } from './avaliacoes.providers.enum';

export const avaliacoesServices: Provider[] = [
  {
    provide: AvaliacoesProvider.AVALIACOES_SERVICE,
    useClass: AvaliacoesService,
  },
];

export const avaliacoesProviders: Provider[] = [...avaliacoesServices];
