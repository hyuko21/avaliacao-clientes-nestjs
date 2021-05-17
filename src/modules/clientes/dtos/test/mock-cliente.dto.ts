import Faker from 'faker';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';
import { IClienteDTO } from '#/clientes/dtos/protocols/cliente.dto.interface';
import { DocumentUtilTest } from '@/test/utils';

export const mockClienteDTO = (): IClienteDTO => ({
  ...mockAbstractDTO(),
  nome: Faker.name.findName(),
  email: Faker.internet.email(),
  telefone:
    Faker.datatype.number({ min: 11, max: 99 }) +
    Faker.phone.phoneNumber('9########'),
  cpf: DocumentUtilTest.generateCpf(),
});

export const mockManyClienteDTO = (): IClienteDTO[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockClienteDTO(),
  );
