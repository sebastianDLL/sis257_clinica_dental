import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosCitasController } from './servicios_citas.controller';
import { ServiciosCitasService } from './servicios_citas.service';

describe('ServiciosCitasController', () => {
  let controller: ServiciosCitasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosCitasController],
      providers: [ServiciosCitasService],
    }).compile();

    controller = module.get<ServiciosCitasController>(ServiciosCitasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
