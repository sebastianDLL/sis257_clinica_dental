import { Test, TestingModule } from '@nestjs/testing';
import { HorasCitasController } from './horas_citas.controller';
import { HorasCitasService } from './horas_citas.service';

describe('HorasCitasController', () => {
  let controller: HorasCitasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorasCitasController],
      providers: [HorasCitasService],
    }).compile();

    controller = module.get<HorasCitasController>(HorasCitasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
