import Faker from 'faker';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';
import { DocumentUtilTest } from '@/test/utils';

export const mockClienteEntity = (): ClienteEntity => ({
  ...mockAbstractDTO(),
  nome: Faker.name.findName(),
  email: Faker.internet.email(),
  telefone: Faker.phone.phoneNumber(),
  cpf: DocumentUtilTest.generateCpf(),
});

export const mockManyClienteEntity = (): ClienteEntity[] =>
  Array.from({ length: Faker.datatype.number({ min: 4, max: 8 }) }).map(() =>
    mockClienteEntity(),
  );
