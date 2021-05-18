import { IAbstractDTO } from '@/common/dtos/protocols/abstract.dto.interface';

export interface ITransacaoDTO extends IAbstractDTO {
  valor: number;
  data: Date;
  idCliente: string;
  idLoja: string;
  idColaborador: string;
}
