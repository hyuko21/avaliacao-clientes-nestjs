import Faker from 'faker';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';
import { mockAbstractEntity } from '@/common/entities/test/mock-abstract.entity';

export const mockTransacaoEntity = (): TransacaoEntity => ({
  ...mockAbstractEntity(),
  valor: Faker.datatype.number(),
  data: Faker.date.recent(),
  idCliente: Faker.datatype.uuid(),
  idLoja: Faker.datatype.uuid(),
  idColaborador: Faker.datatype.uuid(),
});
