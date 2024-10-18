import { Module } from '@nestjs/common';
import { OdontologosServiciosService } from './odontologos_servicios.service';
import { OdontologosServiciosController } from './odontologos_servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdontologoServicio } from './entities/odontologo_servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OdontologoServicio])],
  controllers: [OdontologosServiciosController],
  providers: [OdontologosServiciosService],
})
export class OdontologosServiciosModule {}
