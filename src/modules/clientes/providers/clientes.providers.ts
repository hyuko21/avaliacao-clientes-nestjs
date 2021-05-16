import { Provider } from '@nestjs/common';
import { ClientesService } from '#/clientes/clientes.service';
import { ClientesProvider } from './clientes.providers.enum';

export const clientesServices: Provider[] = [
  {
    provide: ClientesProvider.CLIENTES_SERVICE,
    useClass: ClientesService,
  },
];

export const clientesProviders: Provider[] = [...clientesServices];
