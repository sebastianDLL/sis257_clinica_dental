import { Cliente } from 'src/clientes/entities/cliente.entity';
import { HorasCita } from 'src/horas_citas/entities/horas_cita.entity';
import { OdontologoServicio } from 'src/odontologo_servicios/entities/odontologo_servicio.entity';
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

  @Column('integer', { name: 'odontologo_servicio_id', default: 1 })
  odontologo_servicio_id: number;

  @Column('integer', { name: 'cliente_id', default: 1 })
  cliente_id: number;

  @Column('integer', { name: 'hora_cita_id', default: 1 })
  hora_cita_id: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(
    () => OdontologoServicio,
    (odontologo_servicio) => odontologo_servicio.citas,
  )
  @JoinColumn({ name: 'odontologo_servicio_id', referencedColumnName: 'id' })
  odontologo_servicio: OdontologoServicio;

  @ManyToOne(
    () => Cliente, 
  (cliente) => cliente.citas)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  cliente: Cliente;

  @ManyToOne(
    () => HorasCita, 
    (hora_cita) => hora_cita.citas)
    @JoinColumn({ name: 'hora_cita_id', referencedColumnName: 'id' })
    hora_cita: HorasCita;
}
