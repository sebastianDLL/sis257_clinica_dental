import type { Cliente } from './Cliente'
import type { Odontologo } from './Odontologo'

export interface Cita {
  id: number
  estado: string
  fechaHoraCita: Date
  clienteId: number
  odontologoId: number
  cliente: Cliente
  odontologo: Odontologo
}
