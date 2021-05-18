import { Inject, Injectable } from '@nestjs/common';
import { ILojaDTO } from './dtos/protocols/loja.dto.interface';
import { IAddLojaDTO } from './dtos/protocols/add-loja.dto.interface';
import { ILojasService } from './protocols/lojas.service.interface';
import { LojasProvider } from './providers/lojas.providers.enum';
import { ILojasRepository } from './data/protocols/lojas.repository.interface';
import { LojaDTO } from './dtos/loja.dto';
import { IModifyLojaDTO } from './dtos/protocols/modify-loja.dto.interface';
import { IIdLojaDTO } from './dtos/protocols/id-loja.dto.interface';

@Injectable()
export class LojasService implements ILojasService {
  constructor(
    @Inject(LojasProvider.LOJAS_REPOSITORY)
    private readonly lojasRepository: ILojasRepository,
  ) {}

  async add(dto: IAddLojaDTO): Promise<ILojaDTO> {
    const lojaEntity = await this.lojasRepository.add(dto);
    return new LojaDTO(lojaEntity);
  }
  async list(): Promise<ILojaDTO[]> {
    const manyLojaEntity = await this.lojasRepository.list();
    return manyLojaEntity.map((lojaEntity) => new LojaDTO(lojaEntity));
  }
  async modify(idDto: IIdLojaDTO, dto: IModifyLojaDTO): Promise<ILojaDTO> {
    const lojaEntity = await this.lojasRepository.modify(idDto, dto);
    return new LojaDTO(lojaEntity);
  }
  remove(idDto: IIdLojaDTO): Promise<void> {
    return this.lojasRepository.remove(idDto);
  }
  async loadById(idDto: IIdLojaDTO): Promise<ILojaDTO> {
    const lojaEntity = await this.lojasRepository.loadById(idDto);
    return new LojaDTO(lojaEntity);
  }
}
