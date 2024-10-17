import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosCitasService } from './servicios_citas.service';

describe('ServiciosCitasService', () => {
  let service: ServiciosCitasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiciosCitasService],
    }).compile();

    service = module.get<ServiciosCitasService>(ServiciosCitasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
