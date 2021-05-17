import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { IAddClienteDTO } from './dtos/protocols/add-cliente.dto.interface';
import { mockAddClienteDTO } from './dtos/test/mock-add-cliente.dto';
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

      it('should throw if list() throws', async () => {
        const error = new Error('[ClientesService] list() Error');
        jest.spyOn(clientesService, 'list').mockRejectedValueOnce(error);

        const promise = controller.list();

        await expect(promise).rejects.toThrowError(error);
      });
    });

    it('should return array of ClienteDTO on success', async () => {
      const result = await controller.list();

      expect(result).toEqual(clientesService.manyClienteDTO);
    });
  });
});
