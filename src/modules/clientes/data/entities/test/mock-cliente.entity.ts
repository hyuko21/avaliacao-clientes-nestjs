import Faker from 'faker';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import { DocumentUtilTest } from '@/test/utils';
import { mockAbstractEntity } from '@/common/entities/test/mock-abstract.entity';

export const mockClienteEntity = (): ClienteEntity => ({
  ...mockAbstractEntity(),
  nome: Faker.name.findName(),
  email: Faker.internet.email(),
  telefone:
    Faker.datatype.number({ min: 11, max: 99 }) +
    Faker.phone.phoneNumber('9########'),
  cpf: DocumentUtilTest.generateCpf(),
});

export const mockManyClienteEntity = (): ClienteEntity[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockClienteEntity(),
  );
