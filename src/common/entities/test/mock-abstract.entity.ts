import Faker from 'faker';
import { AbstractEntity } from '@/common/entities/abstract.entity';

export const mockAbstractEntity = (): AbstractEntity => ({
  id: Faker.datatype.uuid(),
  criadoEm: Faker.date.past(),
  atualizadoEm: Faker.date.recent(),
});
