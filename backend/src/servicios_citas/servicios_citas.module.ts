import { Module } from '@nestjs/common';
import { ServiciosCitasService } from './servicios_citas.service';
import { ServiciosCitasController } from './servicios_citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosCita } from './entities/servicios_cita.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Cita } from 'src/citas/entities/cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiciosCita, Servicio, Cita])],
  controllers: [ServiciosCitasController],
  providers: [ServiciosCitasService],
})
export class ServiciosCitasModule {}
