import { Test, TestingModule } from '@nestjs/testing';
import { ColaboradoresService } from './colaboradores.service';
import { ColaboradoresRepositorySpy } from './data/test/mock-colaboradores.repository';
import { ColaboradorDTO } from './dtos/colaborador.dto';
import { IAddColaboradorDTO } from './dtos/protocols/add-colaborador.dto.interface';
import { IIdColaboradorDTO } from './dtos/protocols/id-colaborador.dto.interface';
import { IModifyColaboradorDTO } from './dtos/protocols/modify-colaborador.dto.interface';
import { mockAddColaboradorDTO } from './dtos/test/mock-add-colaborador.dto';
import { mockIdColaboradorDTO } from './dtos/test/mock-id-colaborador.dto';
import { mockModifyColaboradorDTO } from './dtos/test/mock-modify-colaborador.dto';
import { ColaboradoresProvider } from './providers/colaboradores.providers.enum';

describe('ColaboradoresService', () => {
  let service: ColaboradoresService;
  let colaboradoresRepository: ColaboradoresRepositorySpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColaboradoresService,
        {
          provide: ColaboradoresProvider.COLABORADORES_REPOSITORY,
          useClass: ColaboradoresRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<ColaboradoresService>(ColaboradoresService);
    colaboradoresRepository = module.get<ColaboradoresRepositorySpy>(
      ColaboradoresProvider.COLABORADORES_REPOSITORY,
    );
  });

  describe('add()', () => {
    let dto: IAddColaboradorDTO;

    beforeEach(() => {
      dto = mockAddColaboradorDTO();
    });

    describe('ColaboradoresRepository dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(colaboradoresRepository, 'add');

        await service.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[ColaboradoresRepository] add() Error');
        jest.spyOn(colaboradoresRepository, 'add').mockRejectedValueOnce(error);

        const promise = service.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ColaboradorDTO on success', async () => {
      const result = await service.add(dto);

      expect(result).toBeInstanceOf(ColaboradorDTO);
    });
  });

  describe('list()', () => {
    describe('ColaboradoresRepository dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(colaboradoresRepository, 'list');

        await service.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
        expect(listSpy).toHaveBeenCalledWith();
      });

      it('should return empty array if list() return empty', async () => {
        jest.spyOn(colaboradoresRepository, 'list').mockResolvedValueOnce([]);

        const result = await service.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of ColaboradorDTO on success', async () => {
      const result = await service.list();

      result.forEach((item) => expect(item).toBeInstanceOf(ColaboradorDTO));
    });
  });

  describe('modify()', () => {
    let idDto: IIdColaboradorDTO, dto: IModifyColaboradorDTO;

    beforeEach(() => {
      idDto = mockIdColaboradorDTO();
      dto = mockModifyColaboradorDTO();
    });

    describe('ColaboradoresRepository dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(colaboradoresRepository, 'modify');

        await service.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[ColaboradoresRepository] modify() Error');
        jest
          .spyOn(colaboradoresRepository, 'modify')
          .mockRejectedValueOnce(error);

        const promise = service.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ColaboradorDTO on success', async () => {
      const result = await service.modify(idDto, dto);

      expect(result).toBeInstanceOf(ColaboradorDTO);
    });
  });

  describe('remove()', () => {
    let idDto: IIdColaboradorDTO;

    beforeEach(() => {
      idDto = mockIdColaboradorDTO();
    });

    describe('ColaboradoresRepository dependency', () => {
      it('should call remove() with correct params', async () => {
        const removeSpy = jest.spyOn(colaboradoresRepository, 'remove');

        await service.remove(idDto);

        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if remove() throws', async () => {
        const error = new Error('[ColaboradoresRepository] remove() Error');
        jest
          .spyOn(colaboradoresRepository, 'remove')
          .mockRejectedValueOnce(error);

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
    let idDto: IIdColaboradorDTO;

    beforeEach(() => {
      idDto = mockIdColaboradorDTO();
    });

    describe('ColaboradoresRepository dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(colaboradoresRepository, 'loadById');

        await service.loadById(idDto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if loadById() throws', async () => {
        const error = new Error('[ColaboradoresRepository] loadById() Error');
        jest
          .spyOn(colaboradoresRepository, 'loadById')
          .mockRejectedValueOnce(error);

        const promise = service.loadById(idDto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ColaboradorDTO on success', async () => {
      const result = await service.loadById(idDto);

      expect(result).toBeInstanceOf(ColaboradorDTO);
    });
  });
});
