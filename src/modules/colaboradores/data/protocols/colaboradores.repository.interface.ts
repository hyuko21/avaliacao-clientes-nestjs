import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';
import { IIdColaboradorDTO } from '#/colaboradores/dtos/protocols/id-colaborador.dto.interface';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';

export interface IColaboradoresRepository {
  add(dto: IAddColaboradorDTO): Promise<ColaboradorEntity>;
  list(): Promise<ColaboradorEntity[]>;
  modify(idDto: IIdColaboradorDTO, dto: IModifyColaboradorDTO): Promise<ColaboradorEntity>;
  remove(idDto: IIdColaboradorDTO): Promise<void>;
}
