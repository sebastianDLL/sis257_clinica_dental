import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    if (buscarRepetidos)
      throw new ConflictException(
        'El odontólogo con ese email y nombre ya existe',
      );

    const odontologo = new Odontologo();
    odontologo.nombre = createOdontologoDto.nombre.trim();
    odontologo.primerApellido = createOdontologoDto.primerApellido.trim();
    odontologo.segundoApellido = createOdontologoDto.segundoApellido.trim();
    odontologo.email = createOdontologoDto.email.trim();
    odontologo.password = process.env.DEFAULT_PASSWORD;
    odontologo.telefono = createOdontologoDto.telefono.trim();
    odontologo.direccion = createOdontologoDto.direccion.trim();
    odontologo.especialidad = createOdontologoDto.especialidad.trim();

    return this.odontologosRepository.save(odontologo);
  }

  async findAll(): Promise<Odontologo[]> {
    return this.odontologosRepository.find({ relations: ['rol']});
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

  async validate(email: string, clave: string): Promise<Odontologo> {
    const emailOk = await this.odontologosRepository.findOne({
      where: { email },
      select: ['id', 'nombre', 'email', 'password'],
    });

    if (!emailOk) throw new NotFoundException('Usuario inexistente');

    if (!(await emailOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    return emailOk;
  }
}
