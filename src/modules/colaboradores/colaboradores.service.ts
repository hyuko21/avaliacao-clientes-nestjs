import { Inject, Injectable } from '@nestjs/common';
import { IColaboradorDTO } from './dtos/protocols/colaborador.dto.interface';
import { IAddColaboradorDTO } from './dtos/protocols/add-colaborador.dto.interface';
import { IColaboradoresService } from './protocols/colaboradores.service.interface';
import { ColaboradoresProvider } from './providers/colaboradores.providers.enum';
import { IColaboradoresRepository } from './data/protocols/colaboradores.repository.interface';
import { ColaboradorDTO } from './dtos/colaborador.dto';
import { IModifyColaboradorDTO } from './dtos/protocols/modify-colaborador.dto.interface';
import { IIdColaboradorDTO } from './dtos/protocols/id-colaborador.dto.interface';

@Injectable()
export class ColaboradoresService implements IColaboradoresService {
  constructor(
    @Inject(ColaboradoresProvider.COLABORADORES_REPOSITORY)
    private readonly colaboradoresRepository: IColaboradoresRepository,
  ) {}

  async add(dto: IAddColaboradorDTO): Promise<IColaboradorDTO> {
    const colaboradorEntity = await this.colaboradoresRepository.add(dto);
    return new ColaboradorDTO(colaboradorEntity);
  }
  async list(): Promise<IColaboradorDTO[]> {
    const manyColaboradorEntity = await this.colaboradoresRepository.list();
    return manyColaboradorEntity.map(
      (colaboradorEntity) => new ColaboradorDTO(colaboradorEntity),
    );
  }
  async modify(
    idDto: IIdColaboradorDTO,
    dto: IModifyColaboradorDTO,
  ): Promise<IColaboradorDTO> {
    const colaboradorEntity = await this.colaboradoresRepository.modify(idDto, dto);
    return new ColaboradorDTO(colaboradorEntity);
  }
  remove(idDto: IIdColaboradorDTO): Promise<void> {
    return this.colaboradoresRepository.remove(idDto);
  }
}
