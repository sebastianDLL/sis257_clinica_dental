import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HorasCitasService } from './horas_citas.service';
import { CreateHorasCitaDto } from './dto/create-horas_cita.dto';
import { UpdateHorasCitaDto } from './dto/update-horas_cita.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Horas_Citas')
@Controller('horas_citas')
export class HorasCitasController {
  constructor(private readonly horasCitasService: HorasCitasService) {}

  @Post()
  create(@Body() createHorasCitaDto: CreateHorasCitaDto) {
    return this.horasCitasService.create(createHorasCitaDto);
  }

  @Get()
  findAll() {
    return this.horasCitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horasCitasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHorasCitaDto: UpdateHorasCitaDto,
  ) {
    return this.horasCitasService.update(+id, updateHorasCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horasCitasService.remove(+id);
  }
}
