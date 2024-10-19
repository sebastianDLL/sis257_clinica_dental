import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const buscarRepetidos = await this.clientesRepository.findOne({
      where: [{ email: createClienteDto.email }],
    });
    if (buscarRepetidos) {
      throw new ConflictException('El email ya existe');
    }

    const cliente = new Cliente();
    cliente.nombre = createClienteDto.nombre.trim();
    cliente.primerApellido = createClienteDto.primerApellido.trim();
    cliente.segundoApellido = createClienteDto.segundoApellido.trim();
    cliente.email = createClienteDto.email.trim();
    cliente.password = process.env.DEFAULT_PASSWORD;
    cliente.telefono = createClienteDto.telefono.trim();
    cliente.direccion = createClienteDto.direccion.trim();

    return this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find({ relations: ['rol'] });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) {
      throw new ConflictException('El cliente no existe');
    }
    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const Cliente = await this.findOne(id);
    const clienteUpdate = Object.assign(Cliente, updateClienteDto);
    return this.clientesRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return this.clientesRepository.softRemove(cliente);
  }

  async validate(email: string, clave: string): Promise<Cliente> {
    const emailOk = await this.clientesRepository.findOne({
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
