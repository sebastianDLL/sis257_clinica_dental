import { Rol } from 'src/roles/entities/role.entity';
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

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 50 })
  password: string;

  @Column('varchar', { length: 15 })
  telefono: string;

  @Column('varchar', { length: 100 })
  direccion: string;

  @Column('integer', {name : 'rol_id', default: 2 })
  rol_id: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Rol, (rol) => rol.clientes)
  @JoinColumn({ name: 'rol_id', referencedColumnName: 'id' })
  rol: Rol;
}
