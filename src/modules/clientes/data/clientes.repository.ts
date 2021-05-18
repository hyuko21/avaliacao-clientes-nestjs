import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAddClienteDTO } from '#/clientes/dtos/protocols/add-cliente.dto.interface';
import { ClienteEntity } from './entities/cliente.entity';
import { IClientesRepository } from './protocols/clientes.repository.interface';
import { IIdClienteDTO } from '#/clientes/dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from '#/clientes/dtos/protocols/modify-cliente.dto.interface';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(ClienteEntity)
export class ClientesRepository
  extends AbstractRepository<ClienteEntity>
  implements IClientesRepository
{
  add(dto: IAddClienteDTO): Promise<ClienteEntity> {
    return this.repository.save(dto);
  }
  list(): Promise<ClienteEntity[]> {
    return this.repository.find();
  }
  async modify(
    idDto: IIdClienteDTO,
    dto: IModifyClienteDTO,
  ): Promise<ClienteEntity> {
    const clienteEntity = await this.repository.findOne({
      where: { id: idDto.id },
    });
    if (!clienteEntity) {
      throw new NotFoundException();
    }
    await this.repository.save({
      id: idDto.id,
      ...dto,
    });
    return this.repository.findOne({ where: { id: clienteEntity.id } });
  }
  async remove(idDto: IIdClienteDTO): Promise<void> {
    const clienteEntity = await this.repository.findOne({
      where: { id: idDto.id },
    });
    if (!clienteEntity) {
      throw new NotFoundException();
    }
    await this.repository.remove(clienteEntity);
  }
  loadById(idDto: IIdClienteDTO): Promise<ClienteEntity> {
    return this.repository.findOne({ where: { id: idDto.id } });
  }
}
