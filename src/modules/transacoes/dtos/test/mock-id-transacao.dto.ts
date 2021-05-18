import Faker from 'faker';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';

export const mockIdTransacaoDTO = (): IIdTransacaoDTO => ({
  id: Faker.datatype.uuid(),
});
