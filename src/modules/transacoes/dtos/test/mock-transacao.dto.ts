import Faker from 'faker';
import { ITransacaoDTO } from '#/transacoes/dtos/protocols/transacao.dto.interface';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';

export const mockTransacaoDTO = (): ITransacaoDTO => ({
  ...mockAbstractDTO(),
  valor: Faker.datatype.number(),
  data: Faker.date.recent(),
  idCliente: Faker.datatype.uuid(),
  idLoja: Faker.datatype.uuid(),
  idColaborador: Faker.datatype.uuid(),
});

export const mockManyTransacaoDTO = (): ITransacaoDTO[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockTransacaoDTO(),
  );
