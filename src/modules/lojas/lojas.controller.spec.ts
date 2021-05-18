import { Test, TestingModule } from '@nestjs/testing';
import { LojasController } from './lojas.controller';
import { IAddLojaDTO } from './dtos/protocols/add-loja.dto.interface';
import { IIdLojaDTO } from './dtos/protocols/id-loja.dto.interface';
import { IModifyLojaDTO } from './dtos/protocols/modify-loja.dto.interface';
import { mockAddLojaDTO } from './dtos/test/mock-add-loja.dto';
import { mockIdLojaDTO } from './dtos/test/mock-id-loja.dto';
import { mockModifyLojaDTO } from './dtos/test/mock-modify-loja.dto';
import { LojasProvider } from './providers/lojas.providers.enum';
import { LojasServiceSpy } from './test/mock-lojas.service';

describe('LojasController', () => {
  let controller: LojasController;
  let lojasService: LojasServiceSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LojasController],
      providers: [
        {
          provide: LojasProvider.LOJAS_SERVICE,
          useClass: LojasServiceSpy,
        },
      ],
    }).compile();

    controller = module.get<LojasController>(LojasController);
    lojasService = module.get<LojasServiceSpy>(
      LojasProvider.LOJAS_SERVICE,
    );
  });

  describe('add()', () => {
    let dto: IAddLojaDTO;

    beforeEach(() => {
      dto = mockAddLojaDTO();
    });

    describe('LojasService dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(lojasService, 'add');

        await controller.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[LojasService] add() Error');
        jest.spyOn(lojasService, 'add').mockRejectedValueOnce(error);

        const promise = controller.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return LojaDTO on success', async () => {
      const result = await controller.add(dto);

      expect(result).toEqual(lojasService.lojaDTO);
    });
  });

  describe('list()', () => {
    describe('LojasService dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(lojasService, 'list');

        await controller.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
      });

      it('should return empty array if list() returns empty', async () => {
        jest.spyOn(lojasService, 'list').mockResolvedValueOnce([]);

        const result = await controller.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of LojaDTO on success', async () => {
      const result = await controller.list();

      expect(result).toEqual(lojasService.manyLojaDTO);
    });
  });

  describe('modify()', () => {
    let idDto: IIdLojaDTO, dto: IModifyLojaDTO;

    beforeEach(() => {
      idDto = mockIdLojaDTO();
      dto = mockModifyLojaDTO();
    });

    describe('LojasService dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(lojasService, 'modify');

        await controller.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[LojasService] modify() Error');
        jest.spyOn(lojasService, 'modify').mockRejectedValueOnce(error);

        const promise = controller.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return LojaDTO on success', async () => {
      const result = await controller.modify(idDto, dto);

      expect(result).toEqual(lojasService.lojaDTO);
    });
  });

  describe('remove()', () => {
    let idDto: IIdLojaDTO;

    beforeEach(() => {
      idDto = mockIdLojaDTO();
    });

    describe('LojasService dependency', () => {
      it('should call remove() with correct params', async () => {
        const removeSpy = jest.spyOn(lojasService, 'remove');

        await controller.remove(idDto);

        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if remove() throws', async () => {
        const error = new Error('[LojasService] remove() Error');
        jest.spyOn(lojasService, 'remove').mockRejectedValueOnce(error);

        const promise = controller.remove(idDto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return undefined on success', async () => {
      const result = await controller.remove(idDto);

      expect(result).toBeUndefined();
    });
  });
});
