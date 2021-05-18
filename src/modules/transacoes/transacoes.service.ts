import { Injectable } from '@nestjs/common';
import { IAddTransacaoDTO } from './dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from './dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from './dtos/protocols/modify-transacao.dto.interface';
import { ITransacaoDTO } from './dtos/protocols/transacao.dto.interface';
import { ITransacoesService } from './protocols/transacoes.service.interface';

@Injectable()
export class TransacoesService implements ITransacoesService {
  add(dto: IAddTransacaoDTO): Promise<ITransacaoDTO> {
    throw new Error('Method not implemented.');
  }
  modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<ITransacaoDTO> {
    throw new Error('Method not implemented.');
  }
}
