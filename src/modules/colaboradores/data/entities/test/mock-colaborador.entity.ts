import Faker from 'faker';
import { mockAbstractEntity } from '@/common/entities/test/mock-abstract.entity';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';

export const mockColaboradorEntity = (): ColaboradorEntity => ({
  ...mockAbstractEntity(),
  nome: Faker.name.findName(),
});
