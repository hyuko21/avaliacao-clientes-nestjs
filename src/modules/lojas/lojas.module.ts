import { Module } from '@nestjs/common';
import { LojasController } from './lojas.controller';
import { lojasProviders } from './providers/lojas.providers';

@Module({
  controllers: [LojasController],
  providers: [...lojasProviders]
})
export class LojasModule {}
