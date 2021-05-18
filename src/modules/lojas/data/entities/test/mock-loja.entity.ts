import Faker from 'faker';
import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import { mockAbstractEntity } from '@/common/entities/test/mock-abstract.entity';

export const mockLojaEntity = (): LojaEntity => ({
  ...mockAbstractEntity(),
  nome: Faker.name.findName(),
});

export const mockManyLojaEntity = (): LojaEntity[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockLojaEntity(),
  );
