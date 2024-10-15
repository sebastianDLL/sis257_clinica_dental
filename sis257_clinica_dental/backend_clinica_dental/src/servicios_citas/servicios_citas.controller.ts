import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiciosCitasService } from './servicios_citas.service';
import { CreateServiciosCitaDto } from './dto/create-servicios_cita.dto';
import { UpdateServiciosCitaDto } from './dto/update-servicios_cita.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Servicios_Citas')
@Controller('servicios_citas')
export class ServiciosCitasController {
  constructor(private readonly serviciosCitasService: ServiciosCitasService) {}

  @Post()
  create(@Body() createServiciosCitaDto: CreateServiciosCitaDto) {
    return this.serviciosCitasService.create(createServiciosCitaDto);
  }

  @Get()
  findAll() {
    return this.serviciosCitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosCitasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiciosCitaDto: UpdateServiciosCitaDto,
  ) {
    return this.serviciosCitasService.update(+id, updateServiciosCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviciosCitasService.remove(+id);
  }
}
