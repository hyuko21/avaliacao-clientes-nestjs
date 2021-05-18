import { Test, TestingModule } from '@nestjs/testing';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacoesController],
      providers: [
        {
          provide: TransacoesProvider.TRANSACOES_SERVICE,
          useClass: TransacoesServiceSpy,
        },
      ],
    }).compile();

    controller = module.get<TransacoesController>(TransacoesController);
    transacoesService = module.get<TransacoesServiceSpy>(
      TransacoesProvider.TRANSACOES_SERVICE,
    );
  });

  describe('add()', () => {
    let dto: IAddTransacaoDTO;

    beforeEach(() => {
      dto = mockAddTransacaoDTO();
    });

    describe('TransacoesService dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(transacoesService, 'add');

        await controller.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
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

  describe('modify()', () => {
    let idDto: IIdTransacaoDTO, dto: IModifyTransacaoDTO;

    beforeEach(() => {
      idDto = mockIdTransacaoDTO();
      dto = mockModifyTransacaoDTO();
    });

    describe('TransacoesService dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(transacoesService, 'modify');

        await controller.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[TransacoesService] modify() Error');
        jest.spyOn(transacoesService, 'modify').mockRejectedValueOnce(error);

        const promise = controller.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return TransacaoDTO on success', async () => {
      const result = await controller.modify(idDto, dto);

      expect(result).toEqual(transacoesService.transacaoDTO);
    });
  });
});
