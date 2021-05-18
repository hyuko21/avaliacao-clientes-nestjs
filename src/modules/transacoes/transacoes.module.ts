import { Module } from '@nestjs/common';
import { ClientesModule } from '#/clientes/clientes.module';
import { ColaboradoresModule } from '#/colaboradores/colaboradores.module';
import { LojasModule } from '#/lojas/lojas.module';
import {
  transacoesProviders,
  transacoesServices,
} from './providers/transacoes.providers';
import { TransacoesController } from './transacoes.controller';

@Module({
  imports: [ClientesModule, LojasModule, ColaboradoresModule],
  controllers: [TransacoesController],
  providers: [...transacoesProviders],
  exports: [...transacoesServices],
})
export class TransacoesModule {}
