import { PartialType } from '@nestjs/swagger';
import { CreateHorasCitaDto } from './create-horas_cita.dto';

export class UpdateHorasCitaDto extends PartialType(CreateHorasCitaDto) {}
