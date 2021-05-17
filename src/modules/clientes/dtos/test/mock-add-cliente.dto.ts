import Faker from 'faker';
import { DocumentUtilTest } from '@/test/utils';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';

export const mockAddClienteDTO = (): IAddClienteDTO => ({
  nome: Faker.name.findName(),
  email: Faker.internet.email(),
  telefone:
    Faker.datatype.number({ min: 11, max: 99 }) +
    Faker.phone.phoneNumber('9########'),
  cpf: DocumentUtilTest.generateCpf(),
});
