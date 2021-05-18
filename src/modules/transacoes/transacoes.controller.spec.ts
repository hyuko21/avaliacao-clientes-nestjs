import { Test, TestingModule } from '@nestjs/testing';
import { ClientesProvider } from '#/clientes/providers/clientes.providers.enum';
import { ClientesServiceSpy } from '#/clientes/test/mock-clientes.service';
import { ColaboradoresProvider } from '#/colaboradores/providers/colaboradores.providers.enum';
import { ColaboradoresServiceSpy } from '#/colaboradores/test/mock-colaboradores.service';
import { LojasProvider } from '#/lojas/providers/lojas.providers.enum';
import { LojasServiceSpy } from '#/lojas/test/mock-lojas.service';
import { IAddTransacaoDTO } from './dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from './dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from './dtos/protocols/modify-transacao.dto.interface';
import { mockAddTransacaoDTO } from './dtos/test/mock-add-transacao.dto';
import { mockIdTransacaoDTO } from './dtos/test/mock-id-transacao.dto';
import { mockModifyTransacaoDTO } from './dtos/test/mock-modify-transacao.dto';
import { TransacoesProvider } from './providers/transacoes.providers.enum';
import { TransacoesServiceSpy } from './test/mock-transacoes.service';
import { TransacoesController } from './transacoes.controller';

describe('TransacoesController', () => {
  let controller: TransacoesController;
  let transacoesService: TransacoesServiceSpy;
  let clientesService: ClientesServiceSpy;
  let lojasService: LojasServiceSpy;
  let colaboradoresService: ColaboradoresServiceSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacoesController],
      providers: [
        {
          provide: TransacoesProvider.TRANSACOES_SERVICE,
          useClass: TransacoesServiceSpy,
        },
        {
          provide: ClientesProvider.CLIENTES_SERVICE,
          useClass: ClientesServiceSpy,
        },
        {
          provide: LojasProvider.LOJAS_SERVICE,
          useClass: LojasServiceSpy,
        },
        {
          provide: ColaboradoresProvider.COLABORADORES_SERVICE,
          useClass: ColaboradoresServiceSpy,
        },
      ],
    }).compile();

    controller = module.get<TransacoesController>(TransacoesController);
    transacoesService = module.get<TransacoesServiceSpy>(
      TransacoesProvider.TRANSACOES_SERVICE,
    );
    clientesService = module.get<ClientesServiceSpy>(
      ClientesProvider.CLIENTES_SERVICE,
    );
    lojasService = module.get<LojasServiceSpy>(LojasProvider.LOJAS_SERVICE);
    colaboradoresService = module.get<ColaboradoresServiceSpy>(
      ColaboradoresProvider.COLABORADORES_SERVICE,
    );
  });

  describe('add()', () => {
    let dto: IAddTransacaoDTO;

    beforeEach(() => {
      dto = mockAddTransacaoDTO();
    });

    describe('ClientesService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(clientesService, 'loadById');

        await controller.add(dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idCliente });
      });
    });

    describe('LojasService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(lojasService, 'loadById');

        await controller.add(dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idLoja });
      });
    });

    describe('ColaboradoresService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(colaboradoresService, 'loadById');

        await controller.add(dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idColaborador });
      });
    });

    describe('TransacoesService dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(transacoesService, 'add');

        await controller.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith({
          ...dto,
          idCliente: clientesService.clienteDTO.id,
          idLoja: lojasService.lojaDTO.id,
          idColaborador: colaboradoresService.colaboradorDTO.id,
        });
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[TransacoesService] add() Error');
        jest.spyOn(transacoesService, 'add').mockRejectedValueOnce(error);

        const promise = controller.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return TransacaoDTO on success', async () => {
      const result = await controller.add(dto);

      expect(result).toEqual(transacoesService.transacaoDTO);
    });
  });

  describe('list()', () => {
    describe('TransacoesService dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(transacoesService, 'list');

        await controller.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
        expect(listSpy).toHaveBeenCalledWith();
      });

      it('should return empty array if list() returns empty', async () => {
        jest.spyOn(transacoesService, 'list').mockResolvedValueOnce([]);

        const result = await controller.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of TransacaoDTO on success', async () => {
      const result = await controller.list();

      expect(result).toEqual(transacoesService.manyTransacaoDTO);
    });
  });

  describe('modify()', () => {
    let idDto: IIdTransacaoDTO, dto: IModifyTransacaoDTO;

    beforeEach(() => {
      idDto = mockIdTransacaoDTO();
      dto = mockModifyTransacaoDTO();
    });

    describe('ClientesService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(clientesService, 'loadById');

        await controller.modify(idDto, dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idCliente });
      });
    });

    describe('LojasService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(lojasService, 'loadById');

        await controller.modify(idDto, dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idLoja });
      });
    });

    describe('ColaboradoresService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(colaboradoresService, 'loadById');

        await controller.modify(idDto, dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idColaborador });
      });
    });

    describe('TransacoesService dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(transacoesService, 'modify');

        await controller.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, {
          ...dto,
          idCliente: clientesService.clienteDTO.id,
          idLoja: lojasService.lojaDTO.id,
          idColaborador: colaboradoresService.colaboradorDTO.id,
        });
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[TransacoesService] modify() Error');
        jest.spyOn(transacoesService, 'modify').mockRejectedValueOnce(error);

        const promise = controller.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    describe('when dto.idCliente is not provided', () => {
      beforeEach(() => {
        dto.idCliente = undefined;
      });

      describe('ClientesService dependency', () => {
        it('should not call loadById()', async () => {
          const loadByIdSpy = jest.spyOn(clientesService, 'loadById');

          await controller.modify(idDto, dto);

          expect(loadByIdSpy).not.toHaveBeenCalled();
        });
      });

      describe('TransacoesService dependency', () => {
        it('should call modify() with correct params', async () => {
          const modifySpy = jest.spyOn(transacoesService, 'modify');

          await controller.modify(idDto, dto);

          expect(modifySpy).toHaveBeenCalledTimes(1);
          expect(modifySpy).toHaveBeenCalledWith(idDto, {
            ...dto,
            idLoja: lojasService.lojaDTO.id,
            idColaborador: colaboradoresService.colaboradorDTO.id,
          });
        });
      });
    });

    describe('when dto.idLoja is not provided', () => {
      beforeEach(() => {
        dto.idLoja = undefined;
      });

      describe('LojasService dependency', () => {
        it('should not call loadById()', async () => {
          const loadByIdSpy = jest.spyOn(lojasService, 'loadById');

          await controller.modify(idDto, dto);

          expect(loadByIdSpy).not.toHaveBeenCalled();
        });
      });

      describe('TransacoesService dependency', () => {
        it('should call modify() with correct params', async () => {
          const modifySpy = jest.spyOn(transacoesService, 'modify');

          await controller.modify(idDto, dto);

          expect(modifySpy).toHaveBeenCalledTimes(1);
          expect(modifySpy).toHaveBeenCalledWith(idDto, {
            ...dto,
            idCliente: clientesService.clienteDTO.id,
            idColaborador: colaboradoresService.colaboradorDTO.id,
          });
        });
      });
    });

    describe('when dto.idColaborador is not provided', () => {
      beforeEach(() => {
        dto.idColaborador = undefined;
      });

      describe('ColaboradoresService dependency', () => {
        it('should not call loadById()', async () => {
          const loadByIdSpy = jest.spyOn(colaboradoresService, 'loadById');

          await controller.modify(idDto, dto);

          expect(loadByIdSpy).not.toHaveBeenCalled();
        });
      });

      describe('TransacoesService dependency', () => {
        it('should call modify() with correct params', async () => {
          const modifySpy = jest.spyOn(transacoesService, 'modify');

          await controller.modify(idDto, dto);

          expect(modifySpy).toHaveBeenCalledTimes(1);
          expect(modifySpy).toHaveBeenCalledWith(idDto, {
            ...dto,
            idCliente: clientesService.clienteDTO.id,
            idLoja: lojasService.lojaDTO.id,
          });
        });
      });
    });

    it('should return TransacaoDTO on success', async () => {
      const result = await controller.modify(idDto, dto);

      expect(result).toEqual(transacoesService.transacaoDTO);
    });
  });
});
