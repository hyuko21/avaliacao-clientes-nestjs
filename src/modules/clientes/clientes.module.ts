import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { clientesProviders } from './providers/clientes.providers';

@Module({
  controllers: [ClientesController],
  providers: [...clientesProviders],
})
export class ClientesModule {}
