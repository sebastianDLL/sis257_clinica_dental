import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateServiciosCitaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo servicioId es obligatorio' })
  @IsNumber({}, { message: 'El campo servicioId debe ser de tipo number' })
  readonly servicioId: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo citaId es obligatorio' })
  @IsNumber({}, { message: 'El campo citaId debe ser de tipo number' })
  readonly citaId: number;
}
