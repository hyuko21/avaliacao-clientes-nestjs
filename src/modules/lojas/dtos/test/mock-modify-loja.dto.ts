import Faker from 'faker';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';

export const mockModifyLojaDTO = (): IModifyLojaDTO => ({
  nome: Faker.name.findName(),
});
