import { Provider } from '@nestjs/common';
import { LojasService } from '#/lojas/lojas.service';
import { LojasProvider } from './lojas.providers.enum';
import { LojasRepository } from '#/lojas/data/lojas.repository';
import { Connection } from 'typeorm';

export const lojasServices: Provider[] = [
  {
    provide: LojasProvider.LOJAS_SERVICE,
    useClass: LojasService,
  },
];

export const lojasProviders: Provider[] = [
  ...lojasServices,
  {
    provide: LojasProvider.LOJAS_REPOSITORY,
    useFactory: (conn: Connection) =>
      conn.getCustomRepository(LojasRepository),
    inject: [Connection],
  },
];
