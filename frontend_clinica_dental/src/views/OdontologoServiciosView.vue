<script setup lang="ts">
import { ref } from 'vue'
import OdontologoServicioSave from '@/components/odontologo_servicios/OdontologoServicioSave.vue'
import OdontologoServicioList from '@/components/odontologo_servicios/OdontologoServicioList.vue'
import Button from 'primevue/button'
import type { Odontologo_servicio } from '../models/Odontologo_servicio'

const mostrarDialog = ref(false)
const relacionEdit = ref<Odontologo_servicio | null>(null)
const OdontologoServicioListRef = ref<typeof OdontologoServicioList | null>(
  null,
)

function handleCreate() {
  relacionEdit.value = { id: 0, odontologo_id: 0, servicio_id: 0 }
  mostrarDialog.value = true
}

function handleEdit(relacion: Odontologo_servicio) {
  relacionEdit.value = { ...relacion }
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  OdontologoServicioListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Relaciones Odontólogo-Servicios</h1>
    <Button
      label="Crear Nueva Relación"
      icon="pi pi-plus"
      @click="handleCreate"
    />
    <OdontologoServicioList
      ref="OdontologoServicioListRef"
      @edit="handleEdit"
    />
    <OdontologoServicioSave
      :mostrar="mostrarDialog"
      :modoEdicion="!!relacionEdit"
      :relacion="relacionEdit || { id: 0, odontologo_id: 0, servicio_id: 0 }"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
