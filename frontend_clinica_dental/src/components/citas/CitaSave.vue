<script setup lang="ts">
import type { Cita } from '../../models/Cita'
import type { Cliente } from '../../models/Cliente'
import type { Odontologo } from '../../models/Odontologo'
import type { Servicios } from '../../models/Servicios'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import { computed, ref, watch, onMounted } from 'vue'

const ENDPOINT = 'citas'
const CLIENTES_ENDPOINT = 'clientes'
const ODONTOLOGOS_ENDPOINT = 'odontologos'
const SERVICIOS_ENDPOINT = 'servicios/odontologo'

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
const clientes = ref<Cliente[]>([])
const odontologos = ref<Odontologo[]>([])
const servicios = ref<Servicios[]>([])

const estados = [{
  label: 'Confirmada',
  value: 'Confirmada',
}, {
  label: 'Pendiente',
  value: 'Pendiente',
}, {
  label: 'Cancelada',
  value: 'Cancelada',
}]

onMounted(async () => {
  clientes.value = await http.get(CLIENTES_ENDPOINT).then(response => response.data)
  odontologos.value = await http.get(ODONTOLOGOS_ENDPOINT).then(response => response.data)
})

watch(
  () => props.cita,
  newVal => {
    cita.value = { ...newVal }
  },
)

async function obtenerServicios(odontologoId: number) {
  if (odontologoId) {
    servicios.value = await http.get(`${SERVICIOS_ENDPOINT}/${odontologoId}`).then(res => res.data)
  } else {
    servicios.value = []
  }
}

async function handleSave() {
  try {
    const body = {
      clienteId: cita.value.clienteId,
      odontologoId: cita.value.odontologoId,
      servicioId: cita.value.servicioId,
      estado: cita.value.estado,
      fechaHoraCita: cita.value.fechaHoraCita,
    };

    if (props.modoEdicion && cita.value.id) {
      console.log('Datos a enviar:', body);
      await http.patch(`${ENDPOINT}/${cita.value.id}`, body);
    } else {
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
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
      <div class="flex items-center gap-4 mb-4">
        <label for="cliente" class="font-semibold w-24">Cliente</label>
        <Dropdown id="cliente" v-model="cita.clienteId" :options="clientes" optionLabel="nombre" optionValue="id"
          placeholder="Seleccione un cliente" class="flex-auto" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="odontologo" class="font-semibold w-24">Odontólogo</label>
        <Dropdown id="odontologo" v-model="cita.odontologoId" :options="odontologos" optionLabel="nombre"
          optionValue="id" placeholder="Seleccione un odontólogo" class="flex-auto"
          @change="obtenerServicios(cita.odontologoId)" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="servicio" class="font-semibold w-24">Servicio</label>
        <Dropdown id="servicio" v-model="cita.servicioId" :options="servicios" optionLabel="nombre" optionValue="id"
          placeholder="Seleccione un servicio" class="flex-auto" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-24">Estados</label>
        <Dropdown id="estado" v-model="cita.estado" :options="estados" optionLabel="label" optionValue="value"
          placeholder="Seleccione un estado" class="flex-auto" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fechaHoraCita" class="font-semibold w-24">Fecha y Hora</label>
        <Calendar id="fechaHoraCita" v-model="cita.fechaHoraCita" class="flex-auto" showTime showIcon />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary" @click="dialogVisible = false" />
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
      </div>
    </Dialog>
  </div>
</template>


<style scoped></style>
