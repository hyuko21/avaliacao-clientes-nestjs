import { Module } from '@nestjs/common';
import { ColaboradoresController } from './colaboradores.controller';
import {
  colaboradoresProviders,
  colaboradoresServices,
} from './providers/colaboradores.providers';

@Module({
  controllers: [ColaboradoresController],
  providers: [...colaboradoresProviders],
  exports: [...colaboradoresServices],
})
export class ColaboradoresModule {}
