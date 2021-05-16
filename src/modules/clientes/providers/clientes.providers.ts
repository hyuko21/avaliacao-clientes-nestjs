import { Provider } from '@nestjs/common';
import { ClientesService } from '#/clientes/clientes.service';
import { ClientesProvider } from './clientes.providers.enum';
import { ClientesRepository } from '#/clientes/data/clientes.repository';
import { Connection } from 'typeorm';

export const clientesServices: Provider[] = [
  {
    provide: ClientesProvider.CLIENTES_SERVICE,
    useClass: ClientesService,
  },
];

export const clientesProviders: Provider[] = [
  ...clientesServices,
  {
    provide: ClientesProvider.CLIENTES_REPOSITORY,
    useFactory: (conn: Connection) =>
      conn.getCustomRepository(ClientesRepository),
    inject: [Connection],
  },
];
