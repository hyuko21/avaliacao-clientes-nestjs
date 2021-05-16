import Faker from 'faker';
import { mockAbstractDTO } from '@/common/dtos/test/mock-abstract.dto';
import { IClienteDTO } from '#/clientes/dtos/protocols/cliente.dto.interface';
import { DocumentUtilTest } from '@/test/utils';

export const mockClienteDTO = (): IClienteDTO => ({
  ...mockAbstractDTO(),
  nome: Faker.name.findName(),
  email: Faker.internet.email(),
  telefone: Faker.phone.phoneNumber(),
  cpf: DocumentUtilTest.generateCpf(),
});
