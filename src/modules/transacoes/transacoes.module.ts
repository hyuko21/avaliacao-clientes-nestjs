import { Module } from '@nestjs/common';
import { transacoesProviders } from './providers/transacoes.providers';
import { TransacoesController } from './transacoes.controller';

@Module({
  controllers: [TransacoesController],
  providers: [...transacoesProviders],
})
export class TransacoesModule {}
