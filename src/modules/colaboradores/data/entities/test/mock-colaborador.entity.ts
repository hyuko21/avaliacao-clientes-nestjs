import Faker from 'faker';
import { mockAbstractEntity } from '@/common/entities/test/mock-abstract.entity';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';

export const mockColaboradorEntity = (): ColaboradorEntity => ({
  ...mockAbstractEntity(),
  nome: Faker.name.findName(),
});

export const mockManyColaboradorEntity = (): ColaboradorEntity[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockColaboradorEntity(),
  );
