<script setup lang="ts">
import type { Cita } from '../../models/Cita'
import type { Odontologo } from '../../models/Odontologo'
import type { Servicios } from '../../models/Servicios'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import { computed, ref, watch, onMounted } from 'vue'
import { useAuthStore } from '../../stores'

const ENDPOINT = 'citas'
const ODONTOLOGOS_ENDPOINT = 'odontologos'
const SERVICIOS_ENDPOINT = 'servicios/odontologo'

const authStore = useAuthStore()

const props = defineProps({
  mostrar: Boolean,
  cita: {
    type: Object as () => Cita,
    default: () => ({}) as Cita,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

const cita = ref<Cita>({ ...props.cita })
const odontologos = ref<Odontologo[]>([])
const servicios = ref<Servicios[]>([])

const estados = [
  { label: 'Confirmada', value: 'Confirmada' },
  { label: 'Pendiente', value: 'Pendiente' },
  { label: 'Cancelada', value: 'Cancelada' },
]

const intervalos = [
  { label: '08:00 - 09:00', value: '08:00-09:00' },
  { label: '09:00 - 10:00', value: '09:00-10:00' },
  { label: '10:00 - 11:00', value: '10:00-11:00' },
  { label: '11:00 - 12:00', value: '11:00-12:00' },
  { label: '14:00 - 15:00', value: '14:00-15:00' },
  { label: '15:00 - 16:00', value: '15:00-16:00' },
  { label: '16:00 - 17:00', value: '16:00-17:00' },
  { label: '17:00 - 18:00', value: '17:00-18:00' },
]

onMounted(async () => {
  odontologos.value = await http
    .get(ODONTOLOGOS_ENDPOINT)
    .then(response => response.data)
})

watch(
  () => cita.value.odontologoId,
  async odontologoId => {
    if (odontologoId) {
      servicios.value = await http
        .get(`${SERVICIOS_ENDPOINT}/${odontologoId}`)
        .then(response => response.data)
    } else {
      servicios.value = []
    }
  },
)

watch(
  () => props.cita,
  newCita => {
    cita.value = { ...newCita }
    if (!props.modoEdicion) {
      cita.value.estado = 'Pendiente'
    }
  },
  { immediate: true },
)

async function handleSave() {
  try {
    if (!authStore.user) {
      throw new Error('El usuario no está autenticado.')
    }

    const clienteId = authStore.user.id
    const horaInicio = cita.value.intervalo?.split('-')[0]

    if (!horaInicio) {
      throw new Error('Por favor, selecciona un intervalo válido.')
    }

    const fechaSeleccionada = new Date(cita.value.fechaHoraCita)
    const [horas, minutos] = horaInicio.split(':').map(Number)
    fechaSeleccionada.setHours(horas, minutos, 0, 0)

    const body = {
      clienteId: clienteId,
      odontologoId: cita.value.odontologoId,
      servicioId: cita.value.servicioId,
      estado: cita.value.estado,
      fechaHoraCita: fechaSeleccionada.toISOString(),
    }

    if (props.modoEdicion && cita.value.id) {
      await http.patch(`${ENDPOINT}/${cita.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cita.value = {} as Cita
    dialogVisible.value = false
  } catch (error: any) {
    console.error('Error al guardar:', error)
    alert(error?.response?.data?.message || error.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Cita' : 'Crear Cita'"
      style="width: 30rem"
    >
      <!-- Odontólogo -->
      <div class="flex items-center gap-4 mb-4">
        <label for="odontologo" class="font-semibold w-24">Odontólogo</label>
        <Dropdown
          id="odontologo"
          v-model="cita.odontologoId"
          :options="odontologos"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccione un odontólogo"
          class="flex-auto"
        />
      </div>

      <!-- Servicio -->
      <div class="flex items-center gap-4 mb-4">
        <label for="servicio" class="font-semibold w-24">Servicio</label>
        <Dropdown
          id="servicio"
          v-model="cita.servicioId"
          :options="servicios"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccione un servicio"
          class="flex-auto"
        />
      </div>

      <!-- Estado 
      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-24">Estado</label>
        <Dropdown
          id="estado"
          v-model="cita.estado"
          :options="estados"
          optionLabel="label"
          optionValue="value"
          placeholder="Seleccione un estado"
          class="flex-auto"
        />
      </div>-->

      <!-- Fecha -->
      <div class="flex items-center gap-4 mb-4">
        <label for="fecha" class="font-semibold w-24">Fecha</label>
        <Calendar
          id="fecha"
          v-model="cita.fechaHoraCita"
          class="flex-auto"
          showIcon
        />
      </div>

      <!-- Intervalo de tiempo -->
      <div class="flex items-center gap-4 mb-4">
        <label for="intervalo" class="font-semibold w-24">Hora</label>
        <Dropdown
          id="intervalo"
          v-model="cita.intervalo"
          :options="intervalos"
          optionLabel="label"
          optionValue="value"
          placeholder="Seleccione un intervalo"
          class="flex-auto"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button
          type="button"
          label="Guardar"
          icon="pi pi-save"
          @click="handleSave"
        />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.card {
  max-width: 500px;
  margin: 20px auto;
}
</style>
