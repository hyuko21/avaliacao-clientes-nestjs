import { IAbstractDTO } from '@/common/dtos/protocols/abstract.dto.interface';

export interface IAvaliacaoDTO extends IAbstractDTO {
  nota: number;
  comentario?: string;
  idCliente: string;
  idTransacao: string;
}
