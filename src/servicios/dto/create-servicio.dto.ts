import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateServicioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser un string o cadena' })
  @MaxLength(50, {
    message: 'El campo nombre debe tener un máximo de 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
  @IsString({ message: 'El campo descripcion debe ser un string o cadena' })
  @MaxLength(100, {
    message: 'El campo descripcion debe tener un máximo de 100 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio es obligatorio' })
  @IsDefined({ message: 'El campo precio debe estar definido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El campo precio debe ser tipo numérico' },
  )
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracion es obligatorio' })
  @IsDefined({ message: 'El campo duracion debe estar definido' })
  @IsNumber({}, { message: 'El campo duracion debe ser tipo numérico' })
  readonly duracion: number;
}
