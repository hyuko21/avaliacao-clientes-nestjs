import Faker from 'faker';
import { IAddAvaliacaoDTO } from '#/avaliacoes/dtos/protocols/add-avaliacao.dto.interface';

export const mockAddAvaliacaoDTO = (): IAddAvaliacaoDTO => ({
  nota: Faker.datatype.number({ min: 0, max: 10 }),
  comentario: Faker.lorem.sentence(),
  idCliente: Faker.datatype.uuid(),
  idTransacao: Faker.datatype.uuid(),
});
