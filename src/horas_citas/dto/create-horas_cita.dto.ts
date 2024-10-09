import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateHorasCitaDto {
  @ApiProperty()
  @IsDate({ message: 'El campo fecha debe ser de tipo date' })
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
  @Type(() => Date)
  readonly fecha: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo hora es obligatorio' })
  readonly hora: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo disponible es obligatorio' })
  readonly disponible: boolean;
}
