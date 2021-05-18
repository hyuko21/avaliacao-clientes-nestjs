import Faker from 'faker';
import { IAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/avaliacao.dto.interface';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';

export const mockAvaliacaoDTO = (): IAvaliacaoDTO => ({
  ...mockAbstractDTO(),
  nota: Faker.datatype.number({ min: 0, max: 10 }),
  comentario: Faker.lorem.sentence(),
  idCliente: Faker.datatype.uuid(),
  idTransacao: Faker.datatype.uuid(),
});

export const mockManyAvaliacaoDTO = (): IAvaliacaoDTO[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockAvaliacaoDTO(),
  );
