import { Module } from '@nestjs/common';
import { LojasController } from './lojas.controller';
import { LojasService } from './lojas.service';
import { lojasProviders } from './providers/lojas.providers';

@Module({
  controllers: [LojasController],
  providers: [...lojasProviders]
})
export class LojasModule {}
