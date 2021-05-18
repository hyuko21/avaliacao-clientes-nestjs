export interface ITransacaoDTO {
  id: string;
  criadoEm: Date;
  valor: number;
  idCliente: string;
  idLoja: string;
  idColaborador: string;
  atualizadoEm: Date;
}
