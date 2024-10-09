import { Module } from '@nestjs/common';
import { HorasCitasService } from './horas_citas.service';
import { HorasCitasController } from './horas_citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorasCita } from './entities/horas_cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HorasCita])],
  controllers: [HorasCitasController],
  providers: [HorasCitasService],
})
export class HorasCitasModule {}
