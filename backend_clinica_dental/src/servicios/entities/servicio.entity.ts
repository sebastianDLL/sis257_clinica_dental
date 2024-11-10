import { OdontologoServicio } from 'src/odontologo_servicios/entities/odontologo_servicio.entity';
import { ServiciosCita } from 'src/servicios_citas/entities/servicios_cita.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 100 })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('varchar', { length: 50 })
  duracion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @OneToMany(
    () => OdontologoServicio,
    (odontologo_servicio) => odontologo_servicio.servicio,
  )
  odontologo_servicios: OdontologoServicio[];

  @OneToMany(() => ServiciosCita, (serviciosCita) => serviciosCita.servicio)
  servicios_citas: ServiciosCita[];
}
