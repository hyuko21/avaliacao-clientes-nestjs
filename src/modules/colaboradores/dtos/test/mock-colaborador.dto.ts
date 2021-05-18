import Faker from 'faker';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';
import { IColaboradorDTO } from '#/colaboradores/dtos/protocols/colaborador.dto.interface';

export const mockColaboradorDTO = (): IColaboradorDTO => ({
  ...mockAbstractDTO(),
  nome: Faker.name.findName(),
});

export const mockManyColaboradorDTO = (): IColaboradorDTO[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockColaboradorDTO(),
  );
