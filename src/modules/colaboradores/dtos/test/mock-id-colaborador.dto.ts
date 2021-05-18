import Faker from 'faker';
import { IIdColaboradorDTO } from '#/colaboradores/dtos/protocols/id-colaborador.dto.interface';

export const mockIdColaboradorDTO = (): IIdColaboradorDTO => ({
  id: Faker.datatype.uuid(),
});
