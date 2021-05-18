import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';
import { IIdLojaDTO } from '#/lojas/dtos/protocols/id-loja.dto.interface';
import { ILojaDTO } from '#/lojas/dtos/protocols/loja.dto.interface';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';

export interface ILojasService {
  add(dto: IAddLojaDTO): Promise<ILojaDTO>;
  list(): Promise<ILojaDTO[]>;
  modify(idDto: IIdLojaDTO, dto: IModifyLojaDTO): Promise<ILojaDTO>;
  remove(idDto: IIdLojaDTO): Promise<void>;
  loadById(idDto: IIdLojaDTO): Promise<ILojaDTO>;
}
