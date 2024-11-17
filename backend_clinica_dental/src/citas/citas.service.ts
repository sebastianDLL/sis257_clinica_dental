import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private citasRepository: Repository<Cita>,
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
    @InjectRepository(Odontologo)
    private odontologosRepository: Repository<Odontologo>,
    @InjectRepository(Servicio)
    private serviciosRepository: Repository<Servicio>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const { clienteId, odontologoId, fechaHoraCita } = createCitaDto;

    // Verificar si el cliente existe
    const clienteExistente = await this.clientesRepository.findOneBy({
      id: clienteId,
    });
    if (!clienteExistente) {
      throw new NotFoundException(`El cliente con ID ${clienteId} no existe`);
    }

    // Verificar si el odontólogo existe
    const odontologoExistente = await this.odontologosRepository.findOneBy({
      id: odontologoId,
    });
    if (!odontologoExistente) {
      throw new NotFoundException(
        `El odontólogo con ID ${odontologoId} no existe`,
      );
    }

    // Verificar si el servicio existe
    const servicioExistente = await this.serviciosRepository.findOneBy({
      id: createCitaDto.servicioId,
    });
    if (!servicioExistente) {
      throw new NotFoundException(
        `El servicio con ID ${createCitaDto.servicioId} no existe`,
      );
    }

    // Convertir la fecha de la cita a inicio del día (00:00:00)
    const fechaCita = new Date(fechaHoraCita);
    fechaCita.setHours(0, 0, 0, 0);

    // Convertir a fecha fin del día (23:59:59)
    const fechaFinDia = new Date(fechaCita);
    fechaFinDia.setHours(23, 59, 59, 999);

    // Verificar si ya existe una cita para el cliente en ese día
    const citaExistente = await this.citasRepository
      .createQueryBuilder('cita')
      .where('cita.clienteId = :clienteId', { clienteId })
      .andWhere('cita.fechaHoraCita >= :fechaInicio', {
        fechaInicio: fechaCita,
      })
      .andWhere('cita.fechaHoraCita <= :fechaFin', { fechaFin: fechaFinDia })
      .getOne();

    if (citaExistente) {
      throw new ConflictException(
        'El cliente ya tiene una cita programada para este día',
      );
    }

    const nuevaCita = this.citasRepository.create(createCitaDto);
    return this.citasRepository.save(nuevaCita);
  }

  async findAll(): Promise<Cita[]> {
    return this.citasRepository.find({
      relations: ['cliente', 'odontologo', 'servicio'],
    });
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citasRepository.findOne({
      where: { id },
      relations: ['cliente', 'odontologo', 'servicio'],
    });

    if (!cita) throw new NotFoundException('La cita no existe');
    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.findOne(id);

    if (!cita) {
      throw new NotFoundException(`La cita con ID ${id} no existe`);
    }

    // Validar si el cliente se está actualizando
    if (updateCitaDto.clienteId && updateCitaDto.clienteId !== cita.clienteId) {
      const clienteExistente = await this.clientesRepository.findOneBy({
        id: updateCitaDto.clienteId,
      });
      if (!clienteExistente) {
        throw new NotFoundException(
          `El cliente con ID ${updateCitaDto.clienteId} no existe`,
        );
      }
    }

    // Validar si el odontólogo se está actualizando
    if (
      updateCitaDto.odontologoId &&
      updateCitaDto.odontologoId !== cita.odontologoId
    ) {
      const odontologoExistente = await this.odontologosRepository.findOneBy({
        id: updateCitaDto.odontologoId,
      });
      if (!odontologoExistente) {
        throw new NotFoundException(
          `El odontólogo con ID ${updateCitaDto.odontologoId} no existe`,
        );
      }
    }

    // Validar si el servicio se está actualizando
    if (
      updateCitaDto.servicioId &&
      updateCitaDto.servicioId !== cita.servicioId
    ) {
      const servicioExistente = await this.serviciosRepository.findOneBy({
        id: updateCitaDto.servicioId,
      });
      if (!servicioExistente) {
        throw new NotFoundException(
          `El servicio con ID ${updateCitaDto.servicioId} no existe`,
        );
      }
    }

    // Verificar si la fecha se está actualizando y si hay conflicto
    if (updateCitaDto.fechaHoraCita) {
      const fechaCita = new Date(updateCitaDto.fechaHoraCita);
      fechaCita.setHours(0, 0, 0, 0);

      const fechaFinDia = new Date(fechaCita);
      fechaFinDia.setHours(23, 59, 59, 999);

      const citaExistente = await this.citasRepository
        .createQueryBuilder('cita')
        .where('cita.clienteId = :clienteId', {
          clienteId: updateCitaDto.clienteId || cita.clienteId,
        })
        .andWhere('cita.id != :citaId', { citaId: id })
        .andWhere('cita.fechaHoraCita >= :fechaInicio', {
          fechaInicio: fechaCita,
        })
        .andWhere('cita.fechaHoraCita <= :fechaFin', { fechaFin: fechaFinDia })
        .getOne();

      if (citaExistente) {
        throw new ConflictException(
          'El cliente ya tiene una cita programada para este día',
        );
      }
    }

    // Combinar la cita existente con los nuevos datos
    const citaActualizada = {
      ...updateCitaDto, // Sobrescribir con los nuevos datos
      id: id, // Mantener el mismo ID
      fechaHoraCita: updateCitaDto.fechaHoraCita
        ? new Date(updateCitaDto.fechaHoraCita)
        : cita.fechaHoraCita,
    };

    return this.citasRepository.save(citaActualizada);
  }

  async remove(id: number): Promise<Cita> {
    const cita = await this.findOne(id);
    return this.citasRepository.softRemove(cita);
  }

  async obtenerServiciosPorOdontologo(odontologoId: number): Promise<Servicio[]> {
    const servicios = await this.serviciosRepository
      .createQueryBuilder('servicio')
      .innerJoin('odontologo_servicios', 'os', 'os.servicio_id = servicio.id')
      .where('os.odontologo_id = :odontologoId', { odontologoId })
      .getMany();
  
    if (!servicios || servicios.length === 0) {
      throw new NotFoundException(`El odontólogo con ID ${odontologoId} no tiene servicios asociados`);
    }
  
    return servicios;
  }
  
  



}
