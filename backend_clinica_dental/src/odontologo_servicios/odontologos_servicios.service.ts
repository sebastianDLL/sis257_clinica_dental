import {
  BadRequestException,
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
        `El odontólogo ya está asociado con el servicio de nombre ${servicioExistente.nombre}`,
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
    if (isNaN(id)) {
      throw new BadRequestException('El id proporcionado no es válido');
    }

    try {
      const odontologoServicio =
        await this.odontologoServicioRepository.findOneOrFail({
          where: { id },
          relations: ['odontologo', 'servicio'],
        });
      return odontologoServicio;
    } catch (error) {
      throw new ConflictException(
        'El odontólogo no está asociado con este servicio',
      );
    }
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


  async findAllWithServices(): Promise<any> {
    const odontologoServicios = await this.odontologoServicioRepository.find({
      relations: ['odontologo', 'servicio'],
    });
  
    const groupedResult = odontologoServicios.reduce((result, item) => {
      const odontologoId = item.odontologo.id;
  
      if (!result[odontologoId]) {
        result[odontologoId] = {
          id: odontologoId,
          nombre: item.odontologo.nombre,
          primerApellido: item.odontologo.primerApellido,
          segundoApellido: item.odontologo.segundoApellido,
          email: item.odontologo.email,
          telefono: item.odontologo.telefono,
          direccion: item.odontologo.direccion,
          especialidad: item.odontologo.especialidad,
          servicios: [],
        };
      }
  
      result[odontologoId].servicios.push({
        id: item.servicio.id,
        nombre: item.servicio.nombre,
        descripcion: item.servicio.descripcion,
        precio: item.servicio.precio,
        duracion: item.servicio.duracion,
      });
  
      return result;
    }, {});
  
    return Object.values(groupedResult);
  }
  

  async eliminarRelacion(odontologoId: number, servicioId: number): Promise<boolean> {
    try {
      // Buscar la relación entre odontólogo y servicio en la tabla de relaciones
      const relacion = await this.odontologoServicioRepository.findOne({
        where: { odontologoId, servicioId },
      });

      if (!relacion) {
        // Si no se encuentra la relación, retornar falso
        throw new Error('La relación no fue encontrada');
      }

      // Eliminar la relación
      await this.odontologoServicioRepository.remove(relacion);
      return true;
    } catch (error) {
      console.error('Error al eliminar la relación:', error);
      return false;
    }
  }

}
