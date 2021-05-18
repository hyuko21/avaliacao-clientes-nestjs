import { getRepository } from 'typeorm';
import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import { mockInsertClienteEntity } from '#/clientes/data/entities/test/clientes.helpers';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';
import { mockAvaliacaoEntity } from './mock-avaliacao.entity';
import { mockInsertTransacaoEntity } from '#/transacoes/data/entities/test/transacoes.helpers';
import { AvaliacaoEntity } from '#/avaliacoes/data/entities/avaliacao.entity';

export async function mockInsertAvaliacaoEntity(
  clienteEntity?: Partial<ClienteEntity>,
  transacaoEntity?: Partial<TransacaoEntity>,
): Promise<AvaliacaoEntity> {
  let _clienteEntity = clienteEntity;
  if (!_clienteEntity) {
    _clienteEntity = await mockInsertClienteEntity();
  }
  let _transacaoEntity = transacaoEntity;
  if (!_transacaoEntity) {
    _transacaoEntity = await mockInsertTransacaoEntity();
  }
  return getRepository(AvaliacaoEntity).save({
    ...mockAvaliacaoEntity(),
    idCliente: _clienteEntity.id,
    idTransacao: _transacaoEntity.id,
  });
}
