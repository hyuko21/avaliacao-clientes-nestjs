import { Provider } from '@nestjs/common';
import { ColaboradoresService } from '#/colaboradores/colaboradores.service';
import { ColaboradoresProvider } from './colaboradores.providers.enum';
import { ColaboradoresRepository } from '#/colaboradores/data/colaboradores.repository';
import { Connection } from 'typeorm';

export const colaboradoresServices: Provider[] = [
  {
    provide: ColaboradoresProvider.COLABORADORES_SERVICE,
    useClass: ColaboradoresService,
  },
];

export const colaboradoresProviders: Provider[] = [
  ...colaboradoresServices,
  {
    provide: ColaboradoresProvider.COLABORADORES_REPOSITORY,
    useFactory: (conn: Connection) =>
      conn.getCustomRepository(ColaboradoresRepository),
    inject: [Connection],
  },
];
