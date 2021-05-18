import { IColaboradorDTO } from '#/colaboradores/dtos/protocols/colaborador.dto.interface';
import { IColaboradoresService } from '#/colaboradores/protocols/colaboradores.service.interface';
import {
  mockColaboradorDTO,
  mockManyColaboradorDTO,
} from '#/colaboradores/dtos/test/mock-colaborador.dto';
import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';
import { IIdColaboradorDTO } from '#/colaboradores/dtos/protocols/id-colaborador.dto.interface';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';

export class ColaboradoresServiceSpy implements IColaboradoresService {
  colaboradorDTO = mockColaboradorDTO();
  manyColaboradorDTO = mockManyColaboradorDTO();

  async add(dto: IAddColaboradorDTO): Promise<IColaboradorDTO> {
    return this.colaboradorDTO;
  }
  async list(): Promise<IColaboradorDTO[]> {
    return this.manyColaboradorDTO;
  }
  async modify(
    idDto: IIdColaboradorDTO,
    dto: IModifyColaboradorDTO,
  ): Promise<IColaboradorDTO> {
    return this.colaboradorDTO;
  }
  remove(idDto: IIdColaboradorDTO): Promise<void> {
    return;
  }
}
