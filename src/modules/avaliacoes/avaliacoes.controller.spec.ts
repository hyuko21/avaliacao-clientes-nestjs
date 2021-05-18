import { Test, TestingModule } from '@nestjs/testing';
import { ClientesServiceSpy } from '#/clientes/test/mock-clientes.service';
import { TransacoesServiceSpy } from '#/transacoes/test/mock-transacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';
import { AvaliacoesServiceSpy } from './test/mock-avaliacoes.service';
import { AvaliacoesProvider } from './providers/avaliacoes.providers.enum';
import { ClientesProvider } from '#/clientes/providers/clientes.providers.enum';
import { TransacoesProvider } from '#/transacoes/providers/transacoes.providers.enum';
import { IAddAvaliacaoDTO } from './dtos/protocols/add-avaliacao.dto.interface';
import { mockAddAvaliacaoDTO } from './dtos/test/mock-add-avaliacao.dto';

describe('AvaliacoesController', () => {
  let controller: AvaliacoesController;
  let avaliacoesService: AvaliacoesServiceSpy;
  let clientesService: ClientesServiceSpy;
  let transacoesService: TransacoesServiceSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliacoesController],
      providers: [
        {
          provide: AvaliacoesProvider.AVALIACOES_SERVICE,
          useClass: AvaliacoesServiceSpy,
        },
        {
          provide: ClientesProvider.CLIENTES_SERVICE,
          useClass: ClientesServiceSpy,
        },
        {
          provide: TransacoesProvider.TRANSACOES_SERVICE,
          useClass: TransacoesServiceSpy,
        },
      ],
    }).compile();

    controller = module.get<AvaliacoesController>(AvaliacoesController);
    avaliacoesService = module.get<AvaliacoesServiceSpy>(
      AvaliacoesProvider.AVALIACOES_SERVICE,
    );
    clientesService = module.get<ClientesServiceSpy>(
      ClientesProvider.CLIENTES_SERVICE,
    );
    transacoesService = module.get<TransacoesServiceSpy>(
      TransacoesProvider.TRANSACOES_SERVICE,
    );
  });

  describe('add()', () => {
    let dto: IAddAvaliacaoDTO;

    beforeEach(() => {
      dto = mockAddAvaliacaoDTO();
    });

    describe('ClientesService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(clientesService, 'loadById');

        await controller.add(dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idCliente });
      });
    });

    describe('TransacoesService dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(transacoesService, 'loadById');

        await controller.add(dto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith({ id: dto.idTransacao });
      });
    });

    describe('AvaliacoesService dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(avaliacoesService, 'add');

        await controller.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith({
          ...dto,
          idCliente: clientesService.clienteDTO.id,
          idTransacao: transacoesService.transacaoDTO.id,
        });
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[AvaliacoesService] add() Error');
        jest.spyOn(avaliacoesService, 'add').mockRejectedValueOnce(error);

        const promise = controller.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return AvaliacaoDTO on success', async () => {
      const result = await controller.add(dto);

      expect(result).toEqual(avaliacoesService.avaliacaoDTO);
    });
  });

  describe('list()', () => {
    describe('AvaliacoesService dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(avaliacoesService, 'list');

        await controller.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
        expect(listSpy).toHaveBeenCalledWith();
      });

      it('should return empty array if list() returns empty', async () => {
        jest.spyOn(avaliacoesService, 'list').mockResolvedValueOnce([]);

        const result = await controller.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of AvaliacaoDTO on success', async () => {
      const result = await controller.list();

      expect(result).toEqual(avaliacoesService.manyAvaliacaoDTO);
    });
  });
});
