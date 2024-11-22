<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '../../plugins/axios'
import Dialog from 'primevue/dialog'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import type { Servicios } from '../../models/Servicios'
import type { Odontologo_servicio } from '../../models/Odontologo_servicio'
import { useAuthStore } from '@/stores' // Store para autenticación

// Obtener el odontólogo autenticado
const authStore = useAuthStore()
const odontologoLogueado = computed(() => authStore.user)

// Inicializar Toast
const toast = useToast()

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
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema al cargar los servicios.',
      life: 3000,
    })
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
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema al cargar los servicios asignados.',
      life: 3000,
    })
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
      toast.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe seleccionar al menos un servicio.',
        life: 3000,
      })
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
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Relaciones guardadas correctamente.',
      life: 3000,
    })
    emit('guardar')
    emit('close')
    dialogVisible.value = false
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || 'Error desconocido'
    console.error('Error al guardar relaciones:', errorMessage)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Hubo un problema al guardar las relaciones: ${errorMessage}`,
      life: 3000,
    })
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
  <Dialog v-model:visible="dialogVisible" header="Relacionar Servicios" style="width: 30rem">
    <div class="mb-4">
      <label class="font-semibold mb-2">Odontólogo</label>
      <p v-if="odontologoLogueado" class="font-semibold text-blue-500">
        {{ odontologoLogueado.name || 'Nombre no disponible' }}
      </p>
      <p v-else class="font-semibold text-red-500">Odontólogo no autenticado</p>
    </div>

    <div class="mb-4">
      <label class="font-semibold mb-2">Servicios</label>
      <div v-for="servicio in servicios" :key="servicio.id" class="flex items-center">
        <Checkbox v-model="serviciosSeleccionados" :value="servicio.id" :disabled="isServicioAsignado(servicio.id)" />
        <span class="ml-2">{{ servicio.nombre }}</span>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Cancelar" icon="pi pi-times" severity="secondary" @click="emit('close')" />
      <Button label="Guardar" icon="pi pi-save" @click="handleSave" />
    </div>
  </Dialog>
</template>
