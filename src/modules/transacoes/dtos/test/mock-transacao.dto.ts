import Faker from 'faker';
import { ITransacaoDTO } from '#/transacoes/dtos/protocols/transacao.dto.interface';

export const mockTransacaoDTO = (): ITransacaoDTO => ({
  id: Faker.datatype.uuid(),
  valor: Faker.datatype.number(),
  criadoEm: Faker.date.recent(),
  idCliente: Faker.datatype.uuid(),
  idLoja: Faker.datatype.uuid(),
  idColaborador: Faker.datatype.uuid(),
  atualizadoEm: Faker.date.recent(),
});
