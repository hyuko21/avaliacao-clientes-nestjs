import Faker from 'faker';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';

export const mockIdClienteDTO = (): IIdClienteDTO => ({
  id: Faker.datatype.uuid(),
});
