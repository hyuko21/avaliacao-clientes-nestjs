import { Module } from '@nestjs/common';
import { ColaboradoresController } from './colaboradores.controller';
import { colaboradoresProviders } from './providers/colaboradores.providers';

@Module({
  controllers: [ColaboradoresController],
  providers: [...colaboradoresProviders],
})
export class ColaboradoresModule {}
