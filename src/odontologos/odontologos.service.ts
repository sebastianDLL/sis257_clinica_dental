import { ConflictException, Injectable } from '@nestjs/common';
import { CreateOdontologoDto } from './dto/create-odontologo.dto';
import { UpdateOdontologoDto } from './dto/update-odontologo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Odontologo } from './entities/odontologo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OdontologosService {
  constructor(
    @InjectRepository(Odontologo)
    private odontologosRepository: Repository<Odontologo>,
  ) {}

  async create(createOdontologoDto: CreateOdontologoDto): Promise<Odontologo> {
    const buscarRepetidos = await this.odontologosRepository.findOne({
      where: {
        email: createOdontologoDto.email,
        nombre: createOdontologoDto.nombre,
      },
    });
  
    if (buscarRepetidos) throw new ConflictException('El odontólogo con ese email y nombre ya existe');
  
    const odontologo = new Odontologo();
    odontologo.nombre = createOdontologoDto.nombre.trim();
    odontologo.email = createOdontologoDto.email.trim();
    odontologo.telefono = createOdontologoDto.telefono.trim();
    odontologo.direccion = createOdontologoDto.direccion.trim();
    odontologo.especialidad = createOdontologoDto.especialidad.trim();
  
    return this.odontologosRepository.save(odontologo);
  }
  
  async findAll(): Promise<Odontologo[]> {
    return this.odontologosRepository.find();
  }

  async findOne(id: number): Promise<Odontologo> {
    const odontologo = await this.odontologosRepository.findOneBy({ id });
    if (!odontologo) throw new ConflictException('El odontologo no existe');

    return odontologo;
  }

  async update(
    id: number,
    updateOdontologoDto: UpdateOdontologoDto,
  ): Promise<Odontologo> {
    const Odontologo = await this.findOne(id);
    const odontologoUpdate = Object.assign(Odontologo, updateOdontologoDto);
    return this.odontologosRepository.save(odontologoUpdate);
  }

  async remove(id: number): Promise<Odontologo> {
    const odontologo = await this.findOne(id);
    return this.odontologosRepository.softRemove(odontologo);
  }
}
