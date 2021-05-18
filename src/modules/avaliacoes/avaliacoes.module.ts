import { Module } from '@nestjs/common';
import { ClientesModule } from '#/clientes/clientes.module';
import { TransacoesModule } from '#/transacoes/transacoes.module';
import { AvaliacoesController } from './avaliacoes.controller';
import { avaliacoesProviders } from './providers/avaliacoes.providers';

@Module({
  imports: [TransacoesModule, ClientesModule],
  controllers: [AvaliacoesController],
  providers: [...avaliacoesProviders],
})
export class AvaliacoesModule {}
