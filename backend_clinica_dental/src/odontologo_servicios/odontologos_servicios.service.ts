import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOdontologoServicioDto } from './dto/create-odontologo_servicio.dto';
import { UpdateOdontologoServicioDto } from './dto/update-odontologo_servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OdontologoServicio } from './entities/odontologo_servicio.entity';
import { Repository } from 'typeorm';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Injectable()
export class OdontologosServiciosService {
  constructor(
    @InjectRepository(OdontologoServicio)
    private odontologoServicioRepository: Repository<OdontologoServicio>,
    @InjectRepository(Odontologo)
    private odontologoRepository: Repository<Odontologo>,
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
  ) {}

  async create(
    createOdontologoServicioDto: CreateOdontologoServicioDto,
  ): Promise<OdontologoServicio> {
    const { odontologoId, servicioId } = createOdontologoServicioDto;

    // Verificar si el odontólogo existe
    const odontologoExistente = await this.odontologoRepository.findOneBy({
      id: odontologoId,
    });
    if (!odontologoExistente) {
      throw new NotFoundException(
        `El odontólogo con ID ${odontologoId} no existe`,
      );
    }

    // Verificar si el servicio existe
    const servicioExistente = await this.servicioRepository.findOneBy({
      id: servicioId,
    });
    if (!servicioExistente) {
      throw new NotFoundException(`El servicio con ID ${servicioId} no existe`);
    }

    const existe = await this.odontologoServicioRepository.findOne({
      where: { odontologoId: odontologoId, servicioId: servicioId },
    });
    if (existe)
      throw new ConflictException(
        'El odontólogo ya está asociado con este servicio',
      );

    const odontologoServicio = new OdontologoServicio();
    odontologoServicio.odontologoId = createOdontologoServicioDto.odontologoId;
    odontologoServicio.servicioId = createOdontologoServicioDto.servicioId;
    return this.odontologoServicioRepository.save(odontologoServicio);
  }

  async findAll(): Promise<OdontologoServicio[]> {
    return this.odontologoServicioRepository.find({
      relations: ['odontologo', 'servicio'],
    });
  }

  async findOne(id: number): Promise<OdontologoServicio> {
    const odontologoServicio = await this.odontologoServicioRepository.findOne({
      where: { id },
      relations: ['odontologo', 'servicio'],
    });
    if (!odontologoServicio)
      throw new ConflictException(
        'El odontólogo no está asociado con este servicio',
      );
    return odontologoServicio;
  }

  async update(
    id: number,
    updateOdontologoServicioDto: UpdateOdontologoServicioDto,
  ): Promise<OdontologoServicio> {
    const odontologoServicio =
      await this.odontologoServicioRepository.findOneBy({ id });
    if (!odontologoServicio)
      throw new ConflictException(
        'El odontólogo no está asociado con este servicio',
      );

    const odontologoServicioUpdate = Object.assign(
      odontologoServicio,
      updateOdontologoServicioDto,
    );
    return this.odontologoServicioRepository.save(odontologoServicioUpdate);
  }

  async remove(id: number): Promise<OdontologoServicio> {
    const odontologoServicio =
      await this.odontologoServicioRepository.findOneBy({ id });
    if (!odontologoServicio)
      throw new ConflictException(
        'El odontólogo no está asociado con este servicio',
      );
    return this.odontologoServicioRepository.softRemove(odontologoServicio);
  }
}
