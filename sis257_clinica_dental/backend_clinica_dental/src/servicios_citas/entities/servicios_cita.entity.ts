import { Cita } from 'src/citas/entities/cita.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
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

@Entity('servicios_citas')
export class ServiciosCita {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'servicio_id' })
  servicioId: number;

  @Column('integer', { name: 'cita_id' })
  citaId: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Cita, (cita) => cita.servicios_citas)
  @JoinColumn({ name: 'cita_id', referencedColumnName: 'id' })
  cita: Cita;

  @ManyToOne(() => Servicio, (servicio) => servicio.servicios_citas)
  @JoinColumn({ name: 'servicio_id', referencedColumnName: 'id' })
  servicio: Servicio;
}
