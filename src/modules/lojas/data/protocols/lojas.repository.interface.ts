import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';
import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import { IIdLojaDTO } from '#/lojas/dtos/protocols/id-loja.dto.interface';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';

export interface ILojasRepository {
  add(dto: IAddLojaDTO): Promise<LojaEntity>;
  list(): Promise<LojaEntity[]>;
  modify(idDto: IIdLojaDTO, dto: IModifyLojaDTO): Promise<LojaEntity>;
  remove(idDto: IIdLojaDTO): Promise<void>;
}
