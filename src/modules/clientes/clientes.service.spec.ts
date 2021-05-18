import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { ClientesRepositorySpy } from './data/test/mock-clientes.repository';
import { ClienteDTO } from './dtos/cliente.dto';
import { IAddClienteDTO } from './dtos/protocols/add-cliente.dto.interface';
import { IIdClienteDTO } from './dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from './dtos/protocols/modify-cliente.dto.interface';
import { mockAddClienteDTO } from './dtos/test/mock-add-cliente.dto';
import { mockIdClienteDTO } from './dtos/test/mock-id-cliente.dto';
import { mockModifyClienteDTO } from './dtos/test/mock-modify-cliente.dto';
import { ClientesProvider } from './providers/clientes.providers.enum';

describe('ClientesService', () => {
  let service: ClientesService;
  let clientesRepository: ClientesRepositorySpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: ClientesProvider.CLIENTES_REPOSITORY,
          useClass: ClientesRepositorySpy,
        },
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    clientesRepository = module.get<ClientesRepositorySpy>(
      ClientesProvider.CLIENTES_REPOSITORY,
    );
  });

  describe('add()', () => {
    let dto: IAddClienteDTO;

    beforeEach(() => {
      dto = mockAddClienteDTO();
    });

    describe('ClientesRepository dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(clientesRepository, 'add');

        await service.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[ClientesRepository] add() Error');
        jest.spyOn(clientesRepository, 'add').mockRejectedValueOnce(error);

        const promise = service.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ClienteDTO on success', async () => {
      const result = await service.add(dto);

      expect(result).toBeInstanceOf(ClienteDTO);
    });
  });

  describe('list()', () => {
    describe('ClientesRepository dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(clientesRepository, 'list');

        await service.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
        expect(listSpy).toHaveBeenCalledWith();
      });

      it('should return empty array if list() return empty', async () => {
        jest.spyOn(clientesRepository, 'list').mockResolvedValueOnce([]);

        const result = await service.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of ClienteDTO on success', async () => {
      const result = await service.list();

      result.forEach((item) => expect(item).toBeInstanceOf(ClienteDTO));
    });
  });

  describe('modify()', () => {
    let idDto: IIdClienteDTO, dto: IModifyClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
      dto = mockModifyClienteDTO();
    });

    describe('ClientesRepository dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(clientesRepository, 'modify');

        await service.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[ClientesRepository] modify() Error');
        jest.spyOn(clientesRepository, 'modify').mockRejectedValueOnce(error);

        const promise = service.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ClienteDTO on success', async () => {
      const result = await service.modify(idDto, dto);

      expect(result).toBeInstanceOf(ClienteDTO);
    });
  });

  describe('remove()', () => {
    let idDto: IIdClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
    });

    describe('ClientesRepository dependency', () => {
      it('should call remove() with correct params', async () => {
        const removeSpy = jest.spyOn(clientesRepository, 'remove');

        await service.remove(idDto);

        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if remove() throws', async () => {
        const error = new Error('[ClientesRepository] remove() Error');
        jest.spyOn(clientesRepository, 'remove').mockRejectedValueOnce(error);

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
    let idDto: IIdClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
    });

    describe('ClientesRepository dependency', () => {
      it('should call loadById() with correct params', async () => {
        const loadByIdSpy = jest.spyOn(clientesRepository, 'loadById');

        await service.loadById(idDto);

        expect(loadByIdSpy).toHaveBeenCalledTimes(1);
        expect(loadByIdSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if loadById() throws', async () => {
        const error = new Error('[ClientesRepository] loadById() Error');
        jest.spyOn(clientesRepository, 'loadById').mockRejectedValueOnce(error);

        const promise = service.loadById(idDto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ClienteDTO on success', async () => {
      const result = await service.loadById(idDto);

      expect(result).toBeInstanceOf(ClienteDTO);
    });
  });
});
