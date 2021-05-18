import Faker from 'faker';
import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';

export const mockAddLojaDTO = (): IAddLojaDTO => ({
  nome: Faker.name.findName(),
});
