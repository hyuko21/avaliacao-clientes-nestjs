import { IAddTransacaoDTO } from '#/transacoes/dtos/protocols/add-transacao.dto.interface';
import { IModifyTransacaoDTO } from '#/transacoes/dtos/protocols/modify-transacao.dto.interface';
import { ITransacaoDTO } from '#/transacoes/dtos/protocols/transacao.dto.interface';
import { ITransacoesService } from '#/transacoes/protocols/transacoes.service.interface';
import { mockTransacaoDTO } from '#/transacoes/dtos/test/mock-transacao.dto';
import { IIdTransacaoDTO } from '#/transacoes/dtos/protocols/id-transacao.dto.interface';

export class TransacoesServiceSpy implements ITransacoesService {
  transacaoDTO = mockTransacaoDTO();

  async add(dto: IAddTransacaoDTO): Promise<ITransacaoDTO> {
    return this.transacaoDTO;
  }
  async modify(
    idDto: IIdTransacaoDTO,
    dto: IModifyTransacaoDTO,
  ): Promise<ITransacaoDTO> {
    return this.transacaoDTO;
  }
}
