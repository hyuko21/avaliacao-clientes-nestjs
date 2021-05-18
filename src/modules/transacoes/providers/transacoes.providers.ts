import { Provider } from '@nestjs/common';
import { TransacoesService } from '#/transacoes/transacoes.service';
import { TransacoesProvider } from './transacoes.providers.enum';
import { Connection } from 'typeorm';
import { TransacoesRepository } from '#/transacoes/data/transacoes.repository';

export const transacoesServices: Provider[] = [
  {
    provide: TransacoesProvider.TRANSACOES_SERVICE,
    useClass: TransacoesService,
  },
];

export const transacoesProviders: Provider[] = [
  ...transacoesServices,
  {
    provide: TransacoesProvider.TRANSACOES_REPOSITORY,
    useFactory: (conn: Connection) =>
      conn.getCustomRepository(TransacoesRepository),
    inject: [Connection],
  },
];
