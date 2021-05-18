import { ClienteEntity } from '#/clientes/data/entities/cliente.entity';
import { mockInsertClienteEntity } from '#/clientes/data/entities/test/clientes.helpers';
import { ColaboradorEntity } from '#/colaboradores/data/entities/colaborador.entity';
import { LojaEntity } from '#/lojas/data/entities/loja.entity';
import { getRepository } from 'typeorm';
import { TransacaoEntity } from '#/transacoes/data/entities/transacao.entity';
import { mockTransacaoEntity } from './mock-transacao.entity';
import { mockInsertLojaEntity } from '#/lojas/data/entities/test/lojas.helpers';
import { mockInsertColaboradorEntity } from '#/colaboradores/data/entities/test/colaboradores.helpers';

export async function mockInsertTransacaoEntity(
  clienteEntity?: Partial<ClienteEntity>,
  lojaEntity?: Partial<LojaEntity>,
  colaboradorEntity?: Partial<ColaboradorEntity>,
): Promise<TransacaoEntity> {
  let _clienteEntity = clienteEntity;
  if (!_clienteEntity) {
    _clienteEntity = await mockInsertClienteEntity();
  }
  let _lojaEntity = lojaEntity;
  if (!_lojaEntity) {
    _lojaEntity = await mockInsertLojaEntity();
  }
  let _colaboradorEntity = colaboradorEntity;
  if (!_colaboradorEntity) {
    _colaboradorEntity = await mockInsertColaboradorEntity();
  }
  return getRepository(TransacaoEntity).save({
    ...mockTransacaoEntity(),
    idCliente: _clienteEntity.id,
    idLoja: _lojaEntity.id,
    idColaborador: _colaboradorEntity.id,
  });
}
