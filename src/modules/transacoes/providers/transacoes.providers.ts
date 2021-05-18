import { Provider } from '@nestjs/common';
import { TransacoesService } from '#/transacoes/transacoes.service';
import { TransacoesProvider } from './transacoes.providers.enum';

export const transacoesServices: Provider[] = [
  {
    provide: TransacoesProvider.TRANSACOES_SERVICE,
    useClass: TransacoesService,
  },
];

export const transacoesProviders: Provider[] = [...transacoesServices];
