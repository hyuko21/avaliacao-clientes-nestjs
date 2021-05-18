import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import {
  clientesProviders,
  clientesServices,
} from './providers/clientes.providers';

@Module({
  controllers: [ClientesController],
  providers: [...clientesProviders],
  exports: [...clientesServices],
})
export class ClientesModule {}
