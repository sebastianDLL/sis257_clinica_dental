<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import http from '../../plugins/axios'
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import type { Servicios } from '../../models/Servicios'
import type { Odontologo_servicio } from '../../models/Odontologo_servicio'
import { useAuthStore } from '@/stores' // Store para autenticación

// Obtener el odontólogo autenticado
const authStore = useAuthStore()
const odontologoLogueado = computed(() => authStore.user)

// Props y eventos
const props = defineProps({
  mostrar: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

// Estado reactivo
const servicios = ref<Servicios[]>([])
const serviciosAsignados = ref<number[]>([]) // IDs de servicios ya asignados
const serviciosSeleccionados = ref<number[]>([]) // IDs de servicios seleccionados

// Computed para el estado del diálogo
const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) {
      resetFormulario() // Limpia el formulario al cerrar
      emit('close')
    }
  },
})
// Reiniciar el formulario
function resetFormulario() {
  serviciosSeleccionados.value = [] // Limpia los servicios seleccionados
}
// Cargar servicios disponibles
async function cargarServicios() {
  try {
    const response = await http.get('servicios')
    servicios.value = response.data
  } catch (error) {
    console.error('Error al cargar servicios:', error)
    alert('Hubo un problema al cargar los servicios.')
  }
}

// Cargar servicios ya asignados al odontólogo autenticado
async function cargarServiciosAsignados() {
  try {
    if (!odontologoLogueado.value?.id) return

    const response = await http.get('odontologos_servicios/mis-servicios')
    if (Array.isArray(response.data)) {
      serviciosAsignados.value = response.data.map(
        (item: Odontologo_servicio) => item.servicio_id,
      )
    } else {
      console.error('Respuesta inesperada del servidor:', response.data)
      serviciosAsignados.value = []
    }
  } catch (error) {
    console.error('Error al cargar servicios asignados:', error)
    alert('Hubo un problema al cargar los servicios asignados.')
  }
}

// Verificar si un servicio ya está asignado al odontólogo
function isServicioAsignado(servicioId: number) {
  return serviciosAsignados.value.includes(servicioId)
}

// Guardar relaciones
async function handleSave() {
  try {
    if (serviciosSeleccionados.value.length === 0) {
      alert('Debe seleccionar al menos un servicio.')
      return
    }

    // Crear relaciones para cada servicio seleccionado
    await Promise.all(
      serviciosSeleccionados.value.map(servicioId =>
        http.post('odontologos_servicios', {
          odontologoId: odontologoLogueado.value?.id ?? 0,
          servicioId,
        }),
      ),
    )

    // Si todo se guarda correctamente
    await cargarServiciosAsignados() // Actualizar los servicios locales
    emit('guardar')
    emit('close')
    dialogVisible.value = false
  } catch (error: any) {
    // Manejo básico de errores
    const errorMessage =
      error?.response?.data?.message || error?.message || 'Error desconocido'
    console.error('Error al guardar relaciones:', errorMessage)
    alert(`Hubo un problema al guardar las relaciones: ${errorMessage}`)
    emit('guardar')
  }
}

// Montar datos iniciales
onMounted(() => {
  if (odontologoLogueado.value?.id) {
    cargarServicios()
    cargarServiciosAsignados()
  }
})
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    header="Relacionar Servicios"
    style="width: 30rem"
  >
    <div class="mb-4">
      <label class="font-semibold mb-2">Odontólogo</label>
      <p v-if="odontologoLogueado" class="font-semibold text-blue-500">
        {{ odontologoLogueado.name || 'Nombre no disponible' }}
      </p>
      <p v-else class="font-semibold text-red-500">Odontólogo no autenticado</p>
    </div>

    <div class="mb-4">
      <label class="font-semibold mb-2">Servicios</label>
      <div
        v-for="servicio in servicios"
        :key="servicio.id"
        class="flex items-center"
      >
        <Checkbox
          v-model="serviciosSeleccionados"
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
        @click="emit('close')"
      />
      <Button label="Guardar" icon="pi pi-save" @click="handleSave" />
    </div>
  </Dialog>
</template>
