import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';
import { ILojasRepository } from '#/lojas/data/protocols/lojas.repository.interface';
import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import {
  mockLojaEntity,
  mockManyLojaEntity,
} from '#/lojas/data/entities/test/mock-loja.entity';
import { IIdLojaDTO } from '#/lojas/dtos/protocols/id-loja.dto.interface';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';

export class LojasRepositorySpy implements ILojasRepository {
  lojaEntity = mockLojaEntity();
  manyLojaEntity = mockManyLojaEntity();

  async add(dto: IAddLojaDTO): Promise<LojaEntity> {
    return this.lojaEntity;
  }
  async list(): Promise<LojaEntity[]> {
    return this.manyLojaEntity;
  }
  async modify(
    idDto: IIdLojaDTO,
    dto: IModifyLojaDTO,
  ): Promise<LojaEntity> {
    return this.lojaEntity;
  }
  remove(idDto: IIdLojaDTO): Promise<void> {
    return;
  }
}
