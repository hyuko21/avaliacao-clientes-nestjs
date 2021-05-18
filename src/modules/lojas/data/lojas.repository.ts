import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddLojaDTO } from '#/lojas/dtos/protocols/add-loja.dto.interface';
import { LojaEntity } from './entities/loja.entity';
import { ILojasRepository } from './protocols/lojas.repository.interface';
import { IIdLojaDTO } from '#/lojas/dtos/protocols/id-loja.dto.interface';
import { IModifyLojaDTO } from '#/lojas/dtos/protocols/modify-loja.dto.interface';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(LojaEntity)
export class LojasRepository
  extends AbstractRepository<LojaEntity>
  implements ILojasRepository
{
  add(dto: IAddLojaDTO): Promise<LojaEntity> {
    return this.repository.save(dto);
  }
  list(): Promise<LojaEntity[]> {
    return this.repository.find();
  }
  async modify(
    idDto: IIdLojaDTO,
    dto: IModifyLojaDTO,
  ): Promise<LojaEntity> {
    const lojaEntity = await this.repository.findOne({
      where: { id: idDto.id },
    });
    if (!lojaEntity) {
      throw new NotFoundException();
    }
    await this.repository.save({
      id: idDto.id,
      ...dto,
    });
    return this.repository.findOne({ where: { id: lojaEntity.id } });
  }
  async remove(idDto: IIdLojaDTO): Promise<void> {
    const lojaEntity = await this.repository.findOne({
      where: { id: idDto.id },
    });
    if (!lojaEntity) {
      throw new NotFoundException();
    }
    await this.repository.remove(lojaEntity);
  }
}
