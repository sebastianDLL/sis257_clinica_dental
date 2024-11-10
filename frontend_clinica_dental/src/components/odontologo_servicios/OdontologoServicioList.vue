<script setup lang="ts">
import type { Odontologo_servicio } from '@/models/Odontologo_servicio'
import http from '../../plugins/axios'
import { onMounted, ref, computed } from 'vue'
import type { Odontologo } from '../../models/Odontologo'
import type { Servicios } from '../../models/Servicios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

// Interfaz para definir el tipo de odontologo con sus servicios
interface OdontologoConServicios extends Odontologo {
  servicios: Servicios[]
}

// Definir la constante del endpoint
const ENDPOINT = 'odontologos_servicios/odontologos-con-servicios'
const ENDPOINT_DELETE = 'odontologos_servicios'

// Definir las variables reactivas
const odontologos = ref<OdontologoConServicios[]>([])
const nombreBusqueda = ref('')
const emit = defineEmits(['edit'])
const odontologo_serviciosDelete = ref<Odontologo_servicio | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

// Función para obtener todos los odontólogos con sus servicios
async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    odontologos.value = response.data
    console.log('Datos obtenidos:', odontologos.value)
  } catch (error) {
    console.error('Error obteniendo los datos:', error)
  }
}

// Computed para filtrar los odontólogos por nombre en frontend
const odontologosFiltrados = computed(() => {
  return odontologos.value.filter(odontologo =>
    odontologo.nombre
      .toLowerCase()
      .includes(nombreBusqueda.value.toLowerCase()),
  )
})

// Función para emitir la edición de un odontólogo y servicio
function emitirEdicion(odontologoId: number, servicioId: number) {
  const odontologo_servicio: Odontologo_servicio = {
    id: servicioId, // Esto puede variar dependiendo de tu estructura
    odontologo_id: odontologoId,
    servicio_id: servicioId,
  }
  emit('edit', odontologo_servicio)
}

// Función para mostrar el diálogo de confirmación de eliminación
function mostrarEliminarConfirm(odontologoId: number, servicioId: number) {
  const odontologo_servicio = odontologos.value
    .flatMap(odontologo => odontologo.servicios)
    .find(servicio => servicio.id === servicioId)

  if (odontologo_servicio) {
    odontologo_serviciosDelete.value = {
      id: odontologo_servicio.id,
      odontologo_id: odontologoId,
      servicio_id: servicioId,
    }
    mostrarConfirmDialog.value = true
  } else {
    console.error('Servicio no encontrado')
  }
}

// Función para eliminar un servicio
async function eliminar() {
  if (odontologo_serviciosDelete.value) {
    console.log(
      'Eliminando la relación entre OdontologoID:',
      odontologo_serviciosDelete.value.odontologo_id,
      'y ServicioID:',
      odontologo_serviciosDelete.value.servicio_id
    );

    try {
      // Llamada al nuevo endpoint para eliminar la relación
      const response = await http.delete(
        `${ENDPOINT_DELETE}/eliminar-relacion/${odontologo_serviciosDelete.value.odontologo_id}/${odontologo_serviciosDelete.value.servicio_id}`
      );

      console.log('Respuesta del servidor:', response);
      obtenerLista(); // Vuelve a cargar los odontólogos después de eliminar
      mostrarConfirmDialog.value = false;
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Hubo un problema al eliminar la relación.');
    }
  }
}

// Llamar obtenerLista al montar el componente
onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <!-- Campo de búsqueda -->
    <input
      v-model="nombreBusqueda"
      placeholder="Buscar odontólogo por nombre"
    />

    <!-- Mostrar lista de odontólogos filtrada -->
    <div
      v-for="odontologo in odontologosFiltrados"
      :key="odontologo.id"
      class="odontologo"
    >
      <h2>
        {{ odontologo.nombre }} {{ odontologo.primerApellido }}
        {{ odontologo.segundoApellido }}
      </h2>
      <p><strong>Especialidad:</strong> {{ odontologo.especialidad }}</p>
      <p><strong>Correo:</strong> {{ odontologo.email }}</p>
      <p><strong>Teléfono:</strong> {{ odontologo.telefono }}</p>

      <!-- Tabla de servicios -->
      <table>
        <thead>
          <tr>
            <th>Nombre del Servicio</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="servicio in odontologo.servicios" :key="servicio.id">
            <td>{{ servicio.nombre }}</td>
            <td>{{ servicio.descripcion }}</td>
            <td>{{ servicio.precio }}</td>
            <td>{{ servicio.duracion }}</td>
            <td>
              <Button
                icon="pi pi-pencil"
                aria-label="Editar"
                text
                @click="emitirEdicion(odontologo.id, servicio.id)"
              />
              <Button
                icon="pi pi-trash"
                aria-label="Eliminar"
                text
                @click="mostrarEliminarConfirm(odontologo.id, servicio.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diálogo de confirmación de eliminación -->
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}

.odontologo {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  margin-bottom: 0.5rem;
  color: #333;
}

p {
  margin: 0.2rem 0 0.5rem 0;
  color: #666;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid #ddd;
}

th {
  background-color: #f3f3f3;
  font-weight: bold;
  color: #555;
}

td {
  color: #333;
}

input {
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
