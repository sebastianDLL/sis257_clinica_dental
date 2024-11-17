<script setup lang="ts">
import type { Cita } from '../../models/Cita';
import type { Odontologo } from '../../models/Odontologo';
import type { Servicios } from '../../models/Servicios';
import http from '../../plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import { computed, ref, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores';


const ENDPOINT = 'citas';
const ODONTOLOGOS_ENDPOINT = 'odontologos';
const SERVICIOS_ENDPOINT = 'servicios/odontologo';

const authStore = useAuthStore();

const props = defineProps({
  mostrar: Boolean,
  cita: {
    type: Object as () => Cita,
    default: () => ({}) as Cita,
  },
  modoEdicion: Boolean,
});
const emit = defineEmits(['guardar', 'close']);

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close');
  },
});

const cita = ref<Cita>({ ...props.cita });
const odontologos = ref<Odontologo[]>([]);
const servicios = ref<Servicios[]>([]);
const montoTotal = ref<number>(0);

const estados = [
  { label: 'Confirmada', value: 'Confirmada' },
  { label: 'Pendiente', value: 'Pendiente' },
  { label: 'Cancelada', value: 'Cancelada' },
];

// Carga los odontólogos al montar el componente
onMounted(async () => {
  odontologos.value = await http
    .get(ODONTOLOGOS_ENDPOINT)
    .then((response) => response.data);
});

// Actualiza los servicios disponibles cuando se selecciona un odontólogo
watch(
  () => cita.value.odontologoId,
  async (odontologoId) => {
    if (odontologoId) {
      servicios.value = await http
        .get(`${SERVICIOS_ENDPOINT}/${odontologoId}`)
        .then((response) => response.data);
    } else {
      servicios.value = [];
    }
  }
);

// Actualiza el monto total basado en el servicio seleccionado
watch(
  () => cita.value.servicioId,
  (servicioId) => {
    if (servicioId) {
      const servicioSeleccionado = servicios.value.find(
        (s) => s.id === servicioId // No es necesario convertir porque el modelo ya espera un número
      );
      montoTotal.value = servicioSeleccionado ? servicioSeleccionado.precio : 0;
    }
  }
);
// Observa cambios en props.cita y actualiza cita
watch(
  () => props.cita,
  (newCita) => {
    cita.value = { ...newCita };
  },
  { immediate: true } // Esto asegura que se sincronice al cargar por primera vez
);

// Función para cargar servicios
async function cargarServicios(odontologoId: number) {
  servicios.value = await http
    .get(`${SERVICIOS_ENDPOINT}/${odontologoId}`)
    .then((response) => response.data);

  // Validar si el servicio seleccionado aún está disponible
  if (cita.value.servicioId) {
    const servicioSeleccionado = servicios.value.find(
      (s) => s.id === cita.value.servicioId
    );
    if (!servicioSeleccionado) {
      cita.value.servicioId = 0; // Limpia el servicio si ya no está disponible
    }
  }
}
// Observa cambios en odontologoId para cargar servicios
watch(
  () => cita.value.odontologoId,
  async (odontologoId) => {
    if (odontologoId) {
      await cargarServicios(odontologoId);
    } else {
      servicios.value = [];
    }
  }
);
// Cargar datos al abrir el modal en modo edición
watch(
  () => props.cita,
  async (newCita) => {
    cita.value = { ...newCita };

    // Si está en modo edición, carga los servicios asociados al odontólogo seleccionado
    if (props.modoEdicion && cita.value.odontologoId) {
      await cargarServicios(cita.value.odontologoId);
    }
  },
  { immediate: true } // Asegura la ejecución al iniciar
);

async function handleSave() {
  try {
    if (!authStore.user) {
      throw new Error('El usuario no está autenticado.');
    }

    const clienteId = authStore.user.id; // Ahora TypeScript sabe que user no es null

    const body = {
      clienteId: clienteId, // ID del cliente autenticado
      odontologoId: cita.value.odontologoId,
      servicioId: cita.value.servicioId,
      estado: cita.value.estado,
      fechaHoraCita: cita.value.fechaHoraCita,
    };

    if (props.modoEdicion && cita.value.id) {
      console.log('Datos a enviar (editar):', body);
      await http.patch(`${ENDPOINT}/${cita.value.id}`, body);
    } else {
      console.log('Datos a enviar (crear):', body);
      await http.post(ENDPOINT, body);
    }
    emit('guardar');
    cita.value = {} as Cita;
    dialogVisible.value = false;
  } catch (error: any) {
    console.error('Error al guardar:', error);
    alert(error?.response?.data?.message || error.message);
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

      <!-- Monto Total -->
      <div class="flex items-center gap-4 mb-4">
        <label for="monto" class="font-semibold w-24">Monto Total</label>
        <InputText id="monto" :value="montoTotal" readonly class="flex-auto" />
      </div>

      <!-- Estado -->
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
      </div>

      <!-- Fecha y Hora -->
      <div class="flex items-center gap-4 mb-4">
        <label for="fechaHoraCita" class="font-semibold w-24">Fecha y Hora</label>
        <Calendar
          id="fechaHoraCita"
          v-model="cita.fechaHoraCita"
          class="flex-auto"
          showTime
          showIcon
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
