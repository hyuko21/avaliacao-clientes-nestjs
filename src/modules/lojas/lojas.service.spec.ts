import { Test, TestingModule } from '@nestjs/testing';
import { LojasService } from './lojas.service';
import { LojasRepositorySpy } from './data/test/mock-lojas.repository';
import { LojaDTO } from './dtos/loja.dto';
import { IAddLojaDTO } from './dtos/protocols/add-loja.dto.interface';
import { IIdLojaDTO } from './dtos/protocols/id-loja.dto.interface';
import { IModifyLojaDTO } from './dtos/protocols/modify-loja.dto.interface';
import { mockAddLojaDTO } from './dtos/test/mock-add-loja.dto';
import { mockIdLojaDTO } from './dtos/test/mock-id-loja.dto';
import { mockModifyLojaDTO } from './dtos/test/mock-modify-loja.dto';
import { LojasProvider } from './providers/lojas.providers.enum';

describe('LojasService', () => {
  let service: LojasService;
  let lojasRepository: LojasRepositorySpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LojasService,
        {
          provide: LojasProvider.LOJAS_REPOSITORY,
          useClass: LojasRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<LojasService>(LojasService);
    lojasRepository = module.get<LojasRepositorySpy>(
      LojasProvider.LOJAS_REPOSITORY,
    );
  });

  describe('add()', () => {
    let dto: IAddLojaDTO;

    beforeEach(() => {
      dto = mockAddLojaDTO();
    });

    describe('LojasRepository dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(lojasRepository, 'add');

        await service.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[LojasRepository] add() Error');
        jest.spyOn(lojasRepository, 'add').mockRejectedValueOnce(error);

        const promise = service.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return LojaDTO on success', async () => {
      const result = await service.add(dto);

      expect(result).toBeInstanceOf(LojaDTO);
    });
  });

  describe('list()', () => {
    describe('LojasRepository dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(lojasRepository, 'list');

        await service.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
        expect(listSpy).toHaveBeenCalledWith();
      });

      it('should return empty array if list() return empty', async () => {
        jest.spyOn(lojasRepository, 'list').mockResolvedValueOnce([]);

        const result = await service.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of LojaDTO on success', async () => {
      const result = await service.list();

      result.forEach((item) => expect(item).toBeInstanceOf(LojaDTO));
    });
  });

  describe('modify()', () => {
    let idDto: IIdLojaDTO, dto: IModifyLojaDTO;

    beforeEach(() => {
      idDto = mockIdLojaDTO();
      dto = mockModifyLojaDTO();
    });

    describe('LojasRepository dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(lojasRepository, 'modify');

        await service.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[LojasRepository] modify() Error');
        jest.spyOn(lojasRepository, 'modify').mockRejectedValueOnce(error);

        const promise = service.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return LojaDTO on success', async () => {
      const result = await service.modify(idDto, dto);

      expect(result).toBeInstanceOf(LojaDTO);
    });
  });

  describe('remove()', () => {
    let idDto: IIdLojaDTO;

    beforeEach(() => {
      idDto = mockIdLojaDTO();
    });

    describe('LojasRepository dependency', () => {
      it('should call remove() with correct params', async () => {
        const removeSpy = jest.spyOn(lojasRepository, 'remove');

        await service.remove(idDto);

        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if remove() throws', async () => {
        const error = new Error('[LojasRepository] remove() Error');
        jest.spyOn(lojasRepository, 'remove').mockRejectedValueOnce(error);

        const promise = service.remove(idDto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return undefined on success', async () => {
      const result = await service.remove(idDto);

      expect(result).toBeUndefined();
    });
  });

  describe('loadById()', () => {
    let idDto: IIdLojaDTO;

    beforeEach(() => {
      idDto = mockIdLojaDTO();
    });

    describe('LojasRepository dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(lojasRepository, 'loadById');

        await service.loadById(idDto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if loadById() throws', async () => {
        const error = new Error('[LojasRepository] loadById() Error');
        jest.spyOn(lojasRepository, 'loadById').mockRejectedValueOnce(error);

        const promise = service.loadById(idDto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return LojaDTO on success', async () => {
      const result = await service.loadById(idDto);

      expect(result).toBeInstanceOf(LojaDTO);
    });
  });
});
