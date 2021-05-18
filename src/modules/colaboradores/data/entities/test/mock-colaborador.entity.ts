import Faker from 'faker';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';

export const mockColaboradorEntity = (): ColaboradorEntity => ({
  ...mockAbstractDTO(),
  nome: Faker.name.findName(),
});

export const mockManyColaboradorEntity = (): ColaboradorEntity[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockColaboradorEntity(),
  );
