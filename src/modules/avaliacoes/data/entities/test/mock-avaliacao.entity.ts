import Faker from 'faker';
import { mockAbstractEntity } from '@/common/entities/test/mock-abstract.entity';
import { AvaliacaoEntity } from '#/avaliacoes/data/entities/avaliacao.entity';

export const mockAvaliacaoEntity = (): AvaliacaoEntity => ({
  ...mockAbstractEntity(),
  nota: Faker.datatype.number({ min: 0, max: 10 }),
  comentario: Faker.lorem.sentence(),
  idCliente: Faker.datatype.uuid(),
  idTransacao: Faker.datatype.uuid(),
});

export const mockManyAvaliacaoEntity = (): AvaliacaoEntity[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockAvaliacaoEntity(),
  );
