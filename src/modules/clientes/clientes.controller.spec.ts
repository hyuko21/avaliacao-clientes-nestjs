import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { IAddClienteDTO } from './dtos/protocols/add-cliente.dto.interface';
import { IIdClienteDTO } from './dtos/protocols/id-cliente.dto.interface';
import { IModifyClienteDTO } from './dtos/protocols/modify-cliente.dto.interface';
import { mockAddClienteDTO } from './dtos/test/mock-add-cliente.dto';
import { mockIdClienteDTO } from './dtos/test/mock-id-cliente.dto';
import { mockModifyClienteDTO } from './dtos/test/mock-modify-cliente.dto';
import { ClientesProvider } from './providers/clientes.providers.enum';
import { ClientesServiceSpy } from './test/mock-clientes.service';

describe('ClientesController', () => {
  let controller: ClientesController;
  let clientesService: ClientesServiceSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesProvider.CLIENTES_SERVICE,
          useClass: ClientesServiceSpy,
        },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    clientesService = module.get<ClientesServiceSpy>(
      ClientesProvider.CLIENTES_SERVICE,
    );
  });

  describe('add()', () => {
    let dto: IAddClienteDTO;

    beforeEach(() => {
      dto = mockAddClienteDTO();
    });

    describe('ClientesService dependency', () => {
      it('should call add() with correct params', async () => {
        const addSpy = jest.spyOn(clientesService, 'add');

        await controller.add(dto);

        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith(dto);
      });

      it('should throw if add() throws', async () => {
        const error = new Error('[ClientesService] add() Error');
        jest.spyOn(clientesService, 'add').mockRejectedValueOnce(error);

        const promise = controller.add(dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ClienteDTO on success', async () => {
      const result = await controller.add(dto);

      expect(result).toEqual(clientesService.clienteDTO);
    });
  });

  describe('list()', () => {
    describe('ClientesService dependency', () => {
      it('should call list() with correct params', async () => {
        const listSpy = jest.spyOn(clientesService, 'list');

        await controller.list();

        expect(listSpy).toHaveBeenCalledTimes(1);
      });

      it('should return empty array if list() returns empty', async () => {
        jest.spyOn(clientesService, 'list').mockResolvedValueOnce([]);

        const result = await controller.list();

        expect(result).toEqual([]);
      });
    });

    it('should return array of ClienteDTO on success', async () => {
      const result = await controller.list();

      expect(result).toEqual(clientesService.manyClienteDTO);
    });
  });

  describe('modify()', () => {
    let idDto: IIdClienteDTO, dto: IModifyClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
      dto = mockModifyClienteDTO();
    });

    describe('ClientesService dependency', () => {
      it('should call modify() with correct params', async () => {
        const modifySpy = jest.spyOn(clientesService, 'modify');

        await controller.modify(idDto, dto);

        expect(modifySpy).toHaveBeenCalledTimes(1);
        expect(modifySpy).toHaveBeenCalledWith(idDto, dto);
      });

      it('should throw if modify() throws', async () => {
        const error = new Error('[ClientesService] modify() Error');
        jest.spyOn(clientesService, 'modify').mockRejectedValueOnce(error);

        const promise = controller.modify(idDto, dto);

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return ClienteDTO on success', async () => {
      const result = await controller.modify(idDto, dto);

      expect(result).toEqual(clientesService.clienteDTO);
    });
  });

  describe('remove()', () => {
    let idDto: IIdClienteDTO;

    beforeEach(() => {
      idDto = mockIdClienteDTO();
    });

    describe('ClientesService dependency', () => {
      it('should call remove() with correct params', async () => {
        const removeSpy = jest.spyOn(clientesService, 'remove');

        await controller.remove(idDto);

        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledWith(idDto);
      });

      it('should throw if remove() throws', async () => {
        const error = new Error('[ClientesService] remove() Error');
        jest.spyOn(clientesService, 'remove').mockRejectedValueOnce(error);

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
