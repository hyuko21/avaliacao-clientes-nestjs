import Faker from 'faker';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';
import { ILojaDTO } from '#/lojas/dtos/protocols/loja.dto.interface';

export const mockLojaDTO = (): ILojaDTO => ({
  ...mockAbstractDTO(),
  nome: Faker.name.findName(),
});

export const mockManyLojaDTO = (): ILojaDTO[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockLojaDTO(),
  );
