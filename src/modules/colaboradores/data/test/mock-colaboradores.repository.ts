import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';
import { IColaboradoresRepository } from '#/colaboradores/data/protocols/colaboradores.repository.interface';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';
import {
  mockColaboradorEntity,
  mockManyColaboradorEntity,
} from '#/colaboradores/data/entities/test/mock-colaborador.entity';
import { IIdColaboradorDTO } from '#/colaboradores/dtos/protocols/id-colaborador.dto.interface';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';

export class ColaboradoresRepositorySpy implements IColaboradoresRepository {
  colaboradorEntity = mockColaboradorEntity();
  manyColaboradorEntity = mockManyColaboradorEntity();

  async add(dto: IAddColaboradorDTO): Promise<ColaboradorEntity> {
    return this.colaboradorEntity;
  }
  async list(): Promise<ColaboradorEntity[]> {
    return this.manyColaboradorEntity;
  }
  async modify(
    idDto: IIdColaboradorDTO,
    dto: IModifyColaboradorDTO,
  ): Promise<ColaboradorEntity> {
    return this.colaboradorEntity;
  }
  remove(idDto: IIdColaboradorDTO): Promise<void> {
    return;
  }
}
