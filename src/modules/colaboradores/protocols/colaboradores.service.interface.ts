import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';
import { IIdColaboradorDTO } from '#/colaboradores/dtos/protocols/id-colaborador.dto.interface';
import { IColaboradorDTO } from '#/colaboradores/dtos/protocols/colaborador.dto.interface';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';

export interface IColaboradoresService {
  add(dto: IAddColaboradorDTO): Promise<IColaboradorDTO>;
  list(): Promise<IColaboradorDTO[]>;
  modify(
    idDto: IIdColaboradorDTO,
    dto: IModifyColaboradorDTO,
  ): Promise<IColaboradorDTO>;
  remove(idDto: IIdColaboradorDTO): Promise<void>;
  loadById(idDto: IIdColaboradorDTO): Promise<IColaboradorDTO>;
}
