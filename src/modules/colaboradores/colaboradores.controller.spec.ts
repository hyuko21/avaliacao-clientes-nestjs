import { Test, TestingModule } from '@nestjs/testing';
import { ColaboradoresController } from './colaboradores.controller';
import { IAddColaboradorDTO } from './dtos/protocols/add-colaborador.dto.interface';
import { IIdColaboradorDTO } from './dtos/protocols/id-colaborador.dto.interface';
import { IModifyColaboradorDTO } from './dtos/protocols/modify-colaborador.dto.interface';
import { mockAddColaboradorDTO } from './dtos/test/mock-add-colaborador.dto';
import { mockIdColaboradorDTO } from './dtos/test/mock-id-colaborador.dto';
import { mockModifyColaboradorDTO } from './dtos/test/mock-modify-colaborador.dto';
import { ColaboradoresProvider } from './providers/colaboradores.providers.enum';
import { ColaboradoresServiceSpy } from './test/mock-colaboradores.service';

describe('ColaboradoresController', () => {
  let controller: ColaboradoresController;
  let colaboradoresService: ColaboradoresServiceSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColaboradoresController],
      providers: [
        {
          provide: ColaboradoresProvider.COLABORADORES_SERVICE,
          useClass: ColaboradoresServiceSpy,
        },
      ],
    }).compile();

    controller = module.get<ColaboradoresController>(ColaboradoresController);
    colaboradoresService = module.get<ColaboradoresServiceSpy>(
      ColaboradoresProvider.COLABORADORES_SERVICE,
    );
  });

  describe('add()', () => {
    let dto: IAddColaboradorDTO;

    beforeEach(() => {
      dto = mockAddColaboradorDTO();
    });

    describe('ColaboradoresService dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(colaboradoresService, 'add');

        await controller.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[ColaboradoresService] add() Error');
        jest.spyOn(colaboradoresService, 'add').mockRejectedValueOnce(error);

        const promise = controller.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ColaboradorDTO on success', async () => {
      const result = await controller.add(dto);

      expect(result).toEqual(colaboradoresService.colaboradorDTO);
    });
  });

  describe('list()', () => {
    describe('ColaboradoresService dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(colaboradoresService, 'list');

        await controller.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
      });

      it('should return empty array if list() returns empty', async () => {
        jest.spyOn(colaboradoresService, 'list').mockResolvedValueOnce([]);

        const result = await controller.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of ColaboradorDTO on success', async () => {
      const result = await controller.list();

      expect(result).toEqual(colaboradoresService.manyColaboradorDTO);
    });
  });

  describe('modify()', () => {
    let idDto: IIdColaboradorDTO, dto: IModifyColaboradorDTO;

    beforeEach(() => {
      idDto = mockIdColaboradorDTO();
      dto = mockModifyColaboradorDTO();
    });

    describe('ColaboradoresService dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(colaboradoresService, 'modify');

        await controller.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[ColaboradoresService] modify() Error');
        jest.spyOn(colaboradoresService, 'modify').mockRejectedValueOnce(error);

        const promise = controller.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ColaboradorDTO on success', async () => {
      const result = await controller.modify(idDto, dto);

      expect(result).toEqual(colaboradoresService.colaboradorDTO);
    });
  });

  describe('remove()', () => {
    let idDto: IIdColaboradorDTO;

    beforeEach(() => {
      idDto = mockIdColaboradorDTO();
    });

    describe('ColaboradoresService dependency', () => {
      it('should call remove() with correct params', async () => {
        const removeSpy = jest.spyOn(colaboradoresService, 'remove');

        await controller.remove(idDto);

        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if remove() throws', async () => {
        const error = new Error('[ColaboradoresService] remove() Error');
        jest.spyOn(colaboradoresService, 'remove').mockRejectedValueOnce(error);

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
