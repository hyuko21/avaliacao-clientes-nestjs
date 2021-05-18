import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddColaboradorDTO } from '#/colaboradores/dtos/protocols/add-colaborador.dto.interface';
import { ColaboradorEntity } from './entities/colaborador.entity';
import { IColaboradoresRepository } from './protocols/colaboradores.repository.interface';
import { IIdColaboradorDTO } from '#/colaboradores/dtos/protocols/id-colaborador.dto.interface';
import { IModifyColaboradorDTO } from '#/colaboradores/dtos/protocols/modify-colaborador.dto.interface';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(ColaboradorEntity)
export class ColaboradoresRepository
  extends AbstractRepository<ColaboradorEntity>
  implements IColaboradoresRepository
{
  add(dto: IAddColaboradorDTO): Promise<ColaboradorEntity> {
    return this.repository.save(dto);
  }
  list(): Promise<ColaboradorEntity[]> {
    return this.repository.find();
  }
  async modify(
    idDto: IIdColaboradorDTO,
    dto: IModifyColaboradorDTO,
  ): Promise<ColaboradorEntity> {
    const colaboradorEntity = await this.repository.findOne({
      where: { id: idDto.id },
    });
    if (!colaboradorEntity) {
      throw new NotFoundException();
    }
    await this.repository.save({
      id: idDto.id,
      ...dto,
    });
    return this.repository.findOne({ where: { id: colaboradorEntity.id } });
  }
  async remove(idDto: IIdColaboradorDTO): Promise<void> {
    const colaboradorEntity = await this.repository.findOne({
      where: { id: idDto.id },
    });
    if (!colaboradorEntity) {
      throw new NotFoundException();
    }
    await this.repository.remove(colaboradorEntity);
  }
}
