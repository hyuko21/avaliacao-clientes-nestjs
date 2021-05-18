import { Module } from '@nestjs/common';
import { LojasController } from './lojas.controller';
import { lojasProviders, lojasServices } from './providers/lojas.providers';

@Module({
  controllers: [LojasController],
  providers: [...lojasProviders],
  exports: [...lojasServices],
})
export class LojasModule {}
