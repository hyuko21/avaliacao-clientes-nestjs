import Faker from 'faker';
import { DocumentUtilTest } from '@/test/utils';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';

export const mockModifyClienteDTO = (): IModifyClienteDTO => ({
  nome: Faker.name.findName(),
  email: Faker.internet.email(),
  telefone:
    Faker.datatype.number({ min: 11, max: 99 }) +
    Faker.phone.phoneNumber('9########'),
  cpf: DocumentUtilTest.generateCpf(),
});
