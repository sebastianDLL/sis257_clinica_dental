import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private citasRepository: Repository<Cita>,
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
    @InjectRepository(Odontologo)
    private odontologosRepository: Repository<Odontologo>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const { clienteId, odontologoId } = createCitaDto;

    // Verificar si el cliente existe
    const clienteExistente = await this.clientesRepository.findOneBy({ id: clienteId });
    if (!clienteExistente) {
      throw new NotFoundException(`El cliente con ID ${clienteId} no existe`);
    }

    // Verificar si el odontólogo existe
    const odontologoExistente = await this.odontologosRepository.findOneBy({ id: odontologoId });
    if (!odontologoExistente) {
      throw new NotFoundException(`El odontólogo con ID ${odontologoId} no existe`);
    }

    // Verificar si ya existe una cita para el mismo cliente y odontólogo
    const citaExistente = await this.citasRepository.findOne({
      where: {
        clienteId: clienteId,
        odontologoId: odontologoId,
      },
    });

    if (citaExistente) {
      throw new ConflictException('Ya existe una cita en este horario para el odontólogo y cliente');
    }

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
