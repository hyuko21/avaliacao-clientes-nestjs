import Faker from 'faker';
import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';

export const mockAddColaboradorDTO = (): IAddColaboradorDTO => ({
  nome: Faker.name.findName(),
});
