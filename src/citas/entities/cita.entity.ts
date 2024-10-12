import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  estado: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'monto_total', default: 0.00 })
  montoTotal: number;

  @Column('integer', { name: 'cliente_id', default: 1 })
  clienteId: number;

  @Column('integer', { name: 'odontologo_id', default: 1 })
  odontologoId: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(
    () => Cliente, 
  (cliente) => cliente.citas)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  cliente: Cliente;

  @ManyToOne(
    () => Odontologo, 
  (odontologo) => odontologo.citas)
  @JoinColumn({ name: 'odontologo_id', referencedColumnName: 'id' })
  odontologo: Odontologo;
}
