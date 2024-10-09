import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHorasCitaDto } from './dto/create-horas_cita.dto';
import { UpdateHorasCitaDto } from './dto/update-horas_cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HorasCita } from './entities/horas_cita.entity';

@Injectable()
export class HorasCitasService {
  constructor(
    @InjectRepository(HorasCita)
    private horasCitasRepository: Repository<HorasCita>,
  ) {}

  async create(createHorasCitaDto: CreateHorasCitaDto): Promise<HorasCita> {
    const { fecha, hora } = createHorasCitaDto;
    const existe = await this.horasCitasRepository.findOneBy({
      fecha,
      hora,
    });

    if (existe) {
      throw new ConflictException(
        'La cita ya existe para la fecha y hora seleccionadas',
      );
    }
    const horascita = new HorasCita();
    horascita.fecha = createHorasCitaDto.fecha;
    horascita.hora = createHorasCitaDto.hora;
    return this.horasCitasRepository.save(horascita);
  }

  async findAll(): Promise<HorasCita[]> {
    return this.horasCitasRepository.find();
  }

  async findOne(id: number): Promise<HorasCita> {
    const horascita = await this.horasCitasRepository.findOneBy({ id });
    if (!horascita) {
      throw new ConflictException('La hora_cita no existe');
    }
    return horascita;
  }

  async update(
    id: number,
    updateHorasCitaDto: UpdateHorasCitaDto,
  ): Promise<HorasCita> {
    const horascita = await this.findOne(id);
    const horascitaUpdate = Object.assign(horascita, updateHorasCitaDto);
    return this.horasCitasRepository.save(horascitaUpdate);
  }

  async remove(id: number) {
    const horascita = await this.findOne(id);
    return this.horasCitasRepository.softRemove(horascita);
  }
}
