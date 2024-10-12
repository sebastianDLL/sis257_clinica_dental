import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private citasRepository: Repository<Cita>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const { clienteId, odontologoId } = createCitaDto;

    const citaExistente = await this.citasRepository.findOne({
      where: {
        clienteId: clienteId,
        odontologoId: odontologoId,
      },
    });

    if (citaExistente)
      throw new ConflictException(
        'Ya existe una cita en este horario para el odontólogo y cliente',
      );

    const nuevaCita = this.citasRepository.create(createCitaDto);
    return this.citasRepository.save(nuevaCita);
  }

  async findAll(): Promise<Cita[]> {
    return this.citasRepository.find({
      relations: ['cliente', 'odontologo'],
    });
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citasRepository.findOne({
      where: { id },
      relations: ['cliente', 'odontologo'],
    });

    if (!cita) throw new ConflictException('La cita no existe');
    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.citasRepository.findOneBy({ id });

    if (!cita) throw new ConflictException('La cita no existe');

    const citaActualizada = Object.assign(cita, updateCitaDto);
    return this.citasRepository.save(citaActualizada);
  }

  async remove(id: number): Promise<Cita> {
    const cita = await this.citasRepository.findOneBy({ id });

    if (!cita) throw new ConflictException('La cita no existe');

    return this.citasRepository.softRemove(cita);
  }
}
