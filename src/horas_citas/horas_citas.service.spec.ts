import { Test, TestingModule } from '@nestjs/testing';
import { HorasCitasService } from './horas_citas.service';

describe('HorasCitasService', () => {
  let service: HorasCitasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorasCitasService],
    }).compile();

    service = module.get<HorasCitasService>(HorasCitasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
