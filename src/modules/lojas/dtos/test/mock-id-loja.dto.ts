import Faker from 'faker';
import { IIdLojaDTO } from '#/lojas/dtos/protocols/id-loja.dto.interface';

export const mockIdLojaDTO = (): IIdLojaDTO => ({
  id: Faker.datatype.uuid(),
});
