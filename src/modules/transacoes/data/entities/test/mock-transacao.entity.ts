import Faker from 'faker';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';

export const mockTransacaoEntity = (): TransacaoEntity => ({
  id: Faker.datatype.uuid(),
  valor: Faker.datatype.number(),
  criadoEm: Faker.date.recent(),
  idCliente: Faker.datatype.uuid(),
  idLoja: Faker.datatype.uuid(),
  idColaborador: Faker.datatype.uuid(),
  atualizadoEm: Faker.date.recent(),
});
