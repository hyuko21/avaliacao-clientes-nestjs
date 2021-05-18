import { getRepository } from 'typeorm';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';
import { mockColaboradorEntity } from './mock-colaborador.entity';

export function mockInsertColaboradorEntity(): Promise<ColaboradorEntity> {
  return getRepository(ColaboradorEntity).save(mockColaboradorEntity());
}
