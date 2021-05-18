import Faker from 'faker';
import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';

export const mockLojaEntity = (): LojaEntity => ({
  ...mockAbstractDTO(),
  nome: Faker.name.findName(),
});

export const mockManyLojaEntity = (): LojaEntity[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockLojaEntity(),
  );
