import { ILojaDTO } from '#/lojas/dtos/protocols/loja.dto.interface';
import { ILojasService } from '#/lojas/protocols/lojas.service.interface';
import {
  mockLojaDTO,
  mockManyLojaDTO,
} from '#/lojas/dtos/test/mock-loja.dto';
import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';
import { IIdLojaDTO } from '#/lojas/dtos/protocols/id-loja.dto.interface';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';

export class LojasServiceSpy implements ILojasService {
  lojaDTO = mockLojaDTO();
  manyLojaDTO = mockManyLojaDTO();

  async add(dto: IAddLojaDTO): Promise<ILojaDTO> {
    return this.lojaDTO;
  }
  async list(): Promise<ILojaDTO[]> {
    return this.manyLojaDTO;
  }
  async modify(
    idDto: IIdLojaDTO,
    dto: IModifyLojaDTO,
  ): Promise<ILojaDTO> {
    return this.lojaDTO;
  }
  remove(idDto: IIdLojaDTO): Promise<void> {
    return;
  }
}
