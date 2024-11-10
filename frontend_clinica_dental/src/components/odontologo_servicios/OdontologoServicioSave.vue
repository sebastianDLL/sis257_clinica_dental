<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import http from '../../plugins/axios'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import type { Odontologo_servicio } from '../../models/Odontologo_servicio'
import type { Odontologo } from '../../models/Odontologo'
import type { Servicios } from '../../models/Servicios'
import { useOdontologoSeleccionado } from '@/stores/useOdontologoSeleccionado'

const store = useOdontologoSeleccionado()

const props = defineProps({
  mostrar: Boolean,
  relacion: {
    type: Object as () => Odontologo_servicio,
    default: () => ({ id: 0, odontologo_id: 0, servicio_id: 0 }),
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

const odontologos = ref<Odontologo[]>([])
const servicios = ref<Servicios[]>([])
const relacion = ref({
  id: props.relacion.id,
  odontologo_id: props.relacion.odontologo_id,
  servicio_ids: [] as number[], // Array temporal para múltiples IDs
})

const serviciosAsignados = ref<number[]>([]) // Aquí se almacenan los servicios ya asignados al odontólogo

// Sincronizar el objeto `relacion` con `props.relacion`
watch(
  () => props.relacion,
  newVal => {
    relacion.value = {
      id: newVal.id,
      odontologo_id: newVal.odontologo_id,
      servicio_ids: newVal.servicio_id !== 0 ? [newVal.servicio_id] : [],
    }

    // Actualizamos el store.nombreBusqueda con el nombre del odontólogo seleccionado
    const odontologoSeleccionado = odontologos.value.find(
      o => o.id === newVal.odontologo_id,
    )
    if (odontologoSeleccionado) {
      store.nombreBusqueda = odontologoSeleccionado.nombre
    }
  },
  { immediate: true },
)

// Cargar odontólogos y servicios
async function cargarDatos() {
  const [odontologoResponse, servicioResponse] = await Promise.all([
    http.get('odontologos'),
    http.get('servicios'),
  ])
  odontologos.value = odontologoResponse.data
  servicios.value = servicioResponse.data
}

// Cargar los servicios ya asignados para el odontólogo seleccionado
async function cargarServiciosAsignados() {
  const response = await http.get(
    `odontologos_servicios/${relacion.value.odontologo_id}`,
  )
  serviciosAsignados.value = response.data.map((item: any) => item.servicio_id) // Asumimos que la respuesta contiene los IDs de los servicios
}

// Verificar si un servicio ya está asignado al odontólogo
function isServicioAsignado(servicioId: number) {
  return serviciosAsignados.value.includes(servicioId)
}

async function handleSave() {
  try {
    if (
      !relacion.value.odontologo_id ||
      relacion.value.servicio_ids.length === 0
    ) {
      alert('Debe seleccionar un odontólogo y al menos un servicio')
      return
    }

    // Enviar múltiples solicitudes con cada `servicioId` individual
    const requests = relacion.value.servicio_ids.map(servicioId => {
      const body = {
        odontologoId: relacion.value.odontologo_id,
        servicioId: servicioId, // Enviar un solo `servicioId` aquí
      }
      return http.post('odontologos_servicios', body)
    })

    // Espera a que todas las solicitudes se completen
    await Promise.all(requests)

    // Emitir evento para que LIST recargue la lista
    emit('guardar')

    dialogVisible.value = false
  } catch (error: any) {
    console.error(error)
    const errorMessage = error?.response?.data?.message || 'Error desconocido'
    alert(errorMessage)

    // Emitir evento para que LIST recargue la lista también si hay error
    emit('guardar')
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    header="Relacionar Odontólogo y Servicio"
    style="width: 30rem"
  >
    <div class="mb-4">
      <label class="font-semibold mb-2">Odontólogo</label>
      <Dropdown
        v-model="relacion.odontologo_id"
        :options="odontologos"
        option-label="nombre"
        option-value="id"
        class="w-full"
        @change="cargarServiciosAsignados()"
      />
    </div>
    <div class="mb-4">
      <label class="font-semibold mb-2">Servicios</label>
      <div
        v-for="servicio in servicios"
        :key="servicio.id"
        class="flex items-center"
      >
        <Checkbox
          v-model="relacion.servicio_ids"
          :value="servicio.id"
          :disabled="isServicioAsignado(servicio.id)"
        />
        <span class="ml-2">{{ servicio.nombre }}</span>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        @click="dialogVisible = false"
      />
      <Button label="Guardar" icon="pi pi-save" @click="handleSave" />
    </div>
  </Dialog>
</template>
