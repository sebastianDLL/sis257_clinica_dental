import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const { clienteId, odontologoId, fechaHoraInicio, fechaHoraFin } =
      createCitaDto;

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

    // Convertir las fechas a UTC
    const fechaInicioUTC = new Date(fechaHoraInicio).toISOString();
    const fechaFinUTC = new Date(fechaHoraFin).toISOString();

    // Verificar traslapes para el odontólogo
    const traslapeOdontologo = await this.verificarTraslapes(
      odontologoId,
      fechaInicioUTC,
      fechaFinUTC,
      'odontologoId',
    );

    if (traslapeOdontologo) {
      throw new ConflictException(
        'Ya existe una cita en este intervalo de tiempo con el odontólogo seleccionado.',
      );
    }

    // Verificar traslapes para el cliente
    const traslapeCliente = await this.verificarTraslapes(
      clienteId,
      fechaInicioUTC,
      fechaFinUTC,
      'clienteId',
    );

    if (traslapeCliente) {
      throw new ConflictException(
        'Ya tienes una cita programada en este intervalo de tiempo.',
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

    const {
      clienteId,
      odontologoId,
      servicioId,
      fechaHoraInicio,
      fechaHoraFin,
      estado,
    } = updateCitaDto;

    /// Validar si el cliente se está actualizando
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

    // Validar Fechas y Traslapes
    if (fechaHoraInicio && fechaHoraFin) {
      const fechaInicioUTC = new Date(fechaHoraInicio).toISOString();
      const fechaFinUTC = new Date(fechaHoraFin).toISOString();

      // Validar traslape con otras citas del odontólogo
      if (odontologoId) {
        const traslapeOdontologo = await this.verificarTraslapes(
          odontologoId,
          fechaInicioUTC,
          fechaFinUTC,
          'odontologoId',
          id,
        );
        if (traslapeOdontologo) {
          throw new ConflictException(
            'Ya existe una cita en este intervalo de tiempo con el odontólogo seleccionado.',
          );
        }
      }

      // Validar traslape con otras citas del cliente
      if (clienteId) {
        const traslapeCliente = await this.verificarTraslapes(
          clienteId,
          fechaInicioUTC,
          fechaFinUTC,
          'clienteId',
          id,
        );
        if (traslapeCliente) {
          throw new ConflictException(
            'Ya tienes una cita programada en este intervalo de tiempo.',
          );
        }
      }

      // Actualizar Fechas
      cita.fechaHoraInicio = new Date(fechaHoraInicio);
      cita.fechaHoraFin = new Date(fechaHoraFin);
    }

    // Actualizar Estado
    if (estado) {
      cita.estado = estado;
    }
    // Combinar la cita existente con los nuevos datos
    const citaActualizada = {
      ...updateCitaDto, // Sobrescribir con los nuevos datos
      id: id, // Mantener el mismo ID
    };

    return this.citasRepository.save(citaActualizada);
    // Guardar Cambios
  }

  async remove(id: number): Promise<Cita> {
    const cita = await this.findOne(id);
    return this.citasRepository.softRemove(cita);
  }

  async obtenerServiciosPorOdontologo(
    odontologoId: number,
  ): Promise<Servicio[]> {
    const servicios = await this.serviciosRepository
      .createQueryBuilder('servicio')
      .innerJoin('odontologo_servicios', 'os', 'os.servicio_id = servicio.id')
      .where('os.odontologo_id = :odontologoId', { odontologoId })
      .getMany();

    if (!servicios || servicios.length === 0) {
      throw new NotFoundException(
        `El odontólogo con ID ${odontologoId} no tiene servicios asociados`,
      );
    }

    return servicios;
  }

  async verificarTraslapes(
    entidadId: number,
    fechaHoraInicio: string,
    fechaHoraFin: string,
    tipo: 'odontologoId' | 'clienteId',
    citaId?: number,
  ) {
    const query = this.citasRepository
      .createQueryBuilder('cita')
      .where(`cita.${tipo} = :entidadId`, { entidadId })
      .andWhere(
        '(cita.fechaHoraInicio < :fechaHoraFin AND cita.fechaHoraFin > :fechaHoraInicio)',
        { fechaHoraInicio, fechaHoraFin },
      );

    if (citaId) {
      query.andWhere('cita.id != :citaId', { citaId });
    }

    return await query.getOne();
  }
}
