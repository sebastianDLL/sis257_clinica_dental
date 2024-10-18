import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OdontologosServiciosService } from './odontologos_servicios.service';
import { CreateOdontologoServicioDto } from './dto/create-odontologo_servicio.dto';
import { UpdateOdontologoServicioDto } from './dto/update-odontologo_servicio.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Odontologos_Servicios')
@Controller('odontologos_servicios')
export class OdontologosServiciosController {
  constructor(
    private readonly odontologoServiciosService: OdontologosServiciosService,
  ) {}

  @Post()
  create(@Body() createOdontologoServicioDto: CreateOdontologoServicioDto) {
    return this.odontologoServiciosService.create(createOdontologoServicioDto);
  }

  @Get()
  findAll() {
    return this.odontologoServiciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odontologoServiciosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOdontologoServicioDto: UpdateOdontologoServicioDto,
  ) {
    return this.odontologoServiciosService.update(
      +id,
      updateOdontologoServicioDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odontologoServiciosService.remove(+id);
  }
}
