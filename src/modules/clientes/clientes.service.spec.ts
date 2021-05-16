import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { ClientesRepositorySpy } from './data/test/mock-clientes.repository';
import { ClienteDTO } from './dtos/cliente.dto';
import { IAddClienteDTO } from './dtos/protocols/add-cliente.dto.interface';
import { mockAddClienteDTO } from './dtos/test/mock-add-cliente.dto';
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

  describe('ClientesRepository dependency', () => {
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
});
