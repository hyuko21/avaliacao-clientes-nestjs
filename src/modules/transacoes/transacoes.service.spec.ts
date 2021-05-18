import { Test, TestingModule } from '@nestjs/testing';
import { TransacoesRepositorySpy } from './data/test/mock-transacoes.repository';
import { IAddTransacaoDTO } from './dtos/protocols/add-transacao.dto.interface';
import { IIdTransacaoDTO } from './dtos/protocols/id-transacao.dto.interface';
import { IModifyTransacaoDTO } from './dtos/protocols/modify-transacao.dto.interface';
import { mockAddTransacaoDTO } from './dtos/test/mock-add-transacao.dto';
import { mockIdTransacaoDTO } from './dtos/test/mock-id-transacao.dto';
import { mockModifyTransacaoDTO } from './dtos/test/mock-modify-transacao.dto';
import { TransacaoDTO } from './dtos/transacao.dto';
import { TransacoesProvider } from './providers/transacoes.providers.enum';
import { TransacoesService } from './transacoes.service';

describe('TransacoesService', () => {
  let service: TransacoesService;
  let transacoesRepository: TransacoesRepositorySpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransacoesService,
        {
          provide: TransacoesProvider.TRANSACOES_REPOSITORY,
          useClass: TransacoesRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<TransacoesService>(TransacoesService);
    transacoesRepository = module.get<TransacoesRepositorySpy>(
      TransacoesProvider.TRANSACOES_REPOSITORY,
    );
  });

  describe('add()', () => {
    let dto: IAddTransacaoDTO;

    beforeEach(() => {
      dto = mockAddTransacaoDTO();
    });

    describe('TransacoesRepository dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(transacoesRepository, 'add');

        await service.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[TransacoesRepository] add() Error');
        jest.spyOn(transacoesRepository, 'add').mockRejectedValueOnce(error);

        const promise = service.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return TransacaoDTO on success', async () => {
      const result = await service.add(dto);

      expect(result).toBeInstanceOf(TransacaoDTO);
    });
  });

  describe('modify()', () => {
    let idDto: IIdTransacaoDTO, dto: IModifyTransacaoDTO;

    beforeEach(() => {
      idDto = mockIdTransacaoDTO();
      dto = mockModifyTransacaoDTO();
    });

    describe('TransacoesRepository dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(transacoesRepository, 'modify');

        await service.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[TransacoesRepository] modify() Error');
        jest.spyOn(transacoesRepository, 'modify').mockRejectedValueOnce(error);

        const promise = service.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return TransacaoDTO on success', async () => {
      const result = await service.modify(idDto, dto);

      expect(result).toBeInstanceOf(TransacaoDTO);
    });
  });
});
