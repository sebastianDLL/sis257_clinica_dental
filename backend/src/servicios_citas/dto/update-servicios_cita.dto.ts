import { PartialType } from '@nestjs/swagger';
import { CreateServiciosCitaDto } from './create-servicios_cita.dto';

export class UpdateServiciosCitaDto extends PartialType(
  CreateServiciosCitaDto,
) {}
