import Faker from 'faker';
import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';

export const mockAddTransacaoDTO = (): IAddTransacaoDTO => ({
  valor: Faker.datatype.number(),
  data: Faker.date.recent(),
  idCliente: Faker.datatype.uuid(),
  idLoja: Faker.datatype.uuid(),
  idColaborador: Faker.datatype.uuid(),
});
