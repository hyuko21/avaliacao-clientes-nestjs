import Faker from 'faker';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';

export const mockModifyColaboradorDTO = (): IModifyColaboradorDTO => ({
  nome: Faker.name.findName(),
});
