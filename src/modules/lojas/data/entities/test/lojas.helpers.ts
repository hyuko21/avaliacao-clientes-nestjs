import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import { getRepository } from 'typeorm';
import { mockLojaEntity } from './mock-loja.entity';

export function mockInsertLojaEntity(): Promise<LojaEntity> {
  return getRepository(LojaEntity).save(mockLojaEntity());
}
