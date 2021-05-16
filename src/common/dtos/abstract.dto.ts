import { IAbstractDTO } from './protocols/abstract.dto.interface';

export class AbstractDTO implements IAbstractDTO {
  id: string;
  criadoEm: Date;
  atualizadoEm: Date;
}
