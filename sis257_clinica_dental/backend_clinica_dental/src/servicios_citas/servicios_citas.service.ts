import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiciosCitaDto } from './dto/create-servicios_cita.dto';
import { UpdateServiciosCitaDto } from './dto/update-servicios_cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiciosCita } from './entities/servicios_cita.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Cita } from 'src/citas/entities/cita.entity';

@Injectable()
export class ServiciosCitasService {
  constructor(
    @InjectRepository(ServiciosCita)
    private serviciosCitaRepository: Repository<ServiciosCita>,
    @InjectRepository(Servicio)
    private serviciosRepository: Repository<Servicio>,
    @InjectRepository(Cita)
    private citasRepository: Repository<Cita>,
  ) {}

  async create(
    createServiciosCitaDto: CreateServiciosCitaDto,
  ): Promise<ServiciosCita> {
    const { servicioId, citaId } = createServiciosCitaDto;

    // Verificar si el servicio existe
    const servicioExistente = await this.serviciosRepository.findOneBy({
      id: servicioId,
    });
    if (!servicioExistente) {
      throw new NotFoundException(`El servicio con ID ${servicioId} no existe`);
    }

    // Verificar si la cita existe
    const citaExistente = await this.citasRepository.findOneBy({ id: citaId });
    if (!citaExistente) {
      throw new NotFoundException(`La cita con ID ${citaId} no existe`);
    }

    // Verificar si ya existe la relación entre servicio y cita
    const existe = await this.serviciosCitaRepository.findOne({
      where: {
        servicioId,
        citaId,
      },
    });
    if (existe) {
      throw new ConflictException('El servicio ya está asociado con esta cita');
    }

    // Crear la nueva relación
    const serviciosCita = new ServiciosCita();
    serviciosCita.servicioId = servicioId;
    serviciosCita.citaId = citaId;

    return this.serviciosCitaRepository.save(serviciosCita);
  }

  async findAll(): Promise<ServiciosCita[]> {
    return this.serviciosCitaRepository.find({
      relations: ['servicio', 'cita', 'cita.cliente', 'cita.odontologo'],
    });
  }

  async findOne(id: number): Promise<ServiciosCita> {
    const serviciosCita = await this.serviciosCitaRepository.findOne({
      where: { id },
      relations: ['servicio', 'cita', 'cita.cliente', 'cita.odontologo'],
    });

    if (!serviciosCita) {
      throw new ConflictException('El servicio no está asociado con esta cita');
    }

    return serviciosCita;
  }

  async update(
    id: number,
    updateServiciosCitaDto: UpdateServiciosCitaDto,
  ): Promise<ServiciosCita> {
    const serviciosCita = await this.serviciosCitaRepository.findOneBy({ id });
    if (!serviciosCita)
      throw new ConflictException('El servicio no está asociado con esta cita');

    const servicioCitasUpdated = Object.assign(
      serviciosCita,
      updateServiciosCitaDto,
    );

    return this.serviciosCitaRepository.save(servicioCitasUpdated);
  }

  async remove(id: number) {
    const servicioCitas = await this.serviciosCitaRepository.findOneBy({ id });
    if (!servicioCitas)
      throw new ConflictException('el servicio_cita no existe');
    return this.serviciosCitaRepository.softRemove(servicioCitas);
  }
}
