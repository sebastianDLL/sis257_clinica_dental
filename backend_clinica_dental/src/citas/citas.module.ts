import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { Cita } from './entities/cita.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cita, Cliente, Odontologo])],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
