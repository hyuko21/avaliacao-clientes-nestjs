import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesRepositorySpy } from './data/test/mock-avaliacoes.repository';
import { AvaliacaoDTO } from './dtos/avaliacao.dto';
import { IAddAvaliacaoDTO } from './dtos/protocols/add-avaliacao.dto.interface';
import { mockAddAvaliacaoDTO } from './dtos/test/mock-add-avaliacao.dto';
import { AvaliacoesProvider } from './providers/avaliacoes.providers.enum';

describe('AvaliacoesService', () => {
  let service: AvaliacoesService;
  let avaliacoesRepository: AvaliacoesRepositorySpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvaliacoesService,
        {
          provide: AvaliacoesProvider.AVALIACOES_REPOSITORY,
          useClass: AvaliacoesRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<AvaliacoesService>(AvaliacoesService);
    avaliacoesRepository = module.get<AvaliacoesRepositorySpy>(
      AvaliacoesProvider.AVALIACOES_REPOSITORY,
    );
  });

  describe('add()', () => {
    let dto: IAddAvaliacaoDTO;

    beforeEach(() => {
      dto = mockAddAvaliacaoDTO();
    });

    describe('AvaliacoesRepository dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(avaliacoesRepository, 'add');

        await service.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[AvaliacoesRepository] add() Error');
        jest.spyOn(avaliacoesRepository, 'add').mockRejectedValueOnce(error);

        const promise = service.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return AvaliacaoDTO on success', async () => {
      const result = await service.add(dto);

      expect(result).toBeInstanceOf(AvaliacaoDTO);
    });
  });

  describe('list()', () => {
    describe('AvaliacoesRepository dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(avaliacoesRepository, 'list');

        await service.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
        expect(listSpy).toHaveBeenCalledWith();
      });

      it('should return empty array if list() return empty', async () => {
        jest.spyOn(avaliacoesRepository, 'list').mockResolvedValueOnce([]);

        const result = await service.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of AvaliacaoDTO on success', async () => {
      const result = await service.list();

      result.forEach((item) => expect(item).toBeInstanceOf(AvaliacaoDTO));
    });
  });
});
