import Faker from 'faker';
import { IAbstractDTO } from '@/common/dtos/protocols/abstract.dto.interface';

export const mockAbstractDTO = (): IAbstractDTO => ({
  id: Faker.datatype.uuid(),
  criadoEm: Faker.date.past(),
  atualizadoEm: Faker.date.recent(),
});
