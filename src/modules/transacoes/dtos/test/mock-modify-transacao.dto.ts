import Faker from 'faker';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';

export const mockModifyTransacaoDTO = (): IModifyTransacaoDTO => ({
  valor: Faker.datatype.number(),
  criadoEm: Faker.date.recent(),
  idCliente: Faker.datatype.uuid(),
  idLoja: Faker.datatype.uuid(),
  idColaborador: Faker.datatype.uuid(),
});
