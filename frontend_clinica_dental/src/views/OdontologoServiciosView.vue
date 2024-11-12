<script setup lang="ts">
import { ref } from 'vue'
import OdontologoServicioSave from '@/components/odontologo_servicios/OdontologoServicioSave.vue'
import OdontologoServicioList from '@/components/odontologo_servicios/OdontologoServicioList.vue'
//import OdontologoServicioEdit from '@/components/odontologo_servicios/OdontologoServicioEdit.vue'
import Button from 'primevue/button'
import type { Odontologo_servicio } from '../models/Odontologo_servicio'

const mostrarDialogCreate = ref(false)  // Para el modo creación
const mostrarDialogEdit = ref(false)    // Para el modo edición
const relacionEdit = ref<Odontologo_servicio | null>(null)
const OdontologoServicioListRef = ref<typeof OdontologoServicioList | null>(null)

// Función para manejar la creación
function handleCreate() {
  relacionEdit.value = { id: 0, odontologo_id: 0, servicio_id: 0 }
  mostrarDialogCreate.value = true  // Solo mostrar el diálogo de creación
}

// Función para manejar la edición
function handleEdit(relacion: Odontologo_servicio) {
  relacionEdit.value = { ...relacion }
  mostrarDialogEdit.value = true  // Solo mostrar el diálogo de edición
}

// Función para cerrar ambos diálogos
function handleCloseDialog() {
  mostrarDialogCreate.value = false
  mostrarDialogEdit.value = false
}

// Función para actualizar la lista después de guardar
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
    
    <!-- Lista de relaciones -->
    <OdontologoServicioList
      ref="OdontologoServicioListRef"
      @edit="handleEdit"
    />
    
    <!-- Diálogo de creación -->
    <OdontologoServicioSave
      :mostrar="mostrarDialogCreate"
      :modoEdicion="false"
      :relacion="relacionEdit || { id: 0, odontologo_id: 0, servicio_id: 0 }"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />

    <!-- Diálogo de edición 
    <OdontologoServicioEdit
      :mostrar="mostrarDialogEdit"
      :relacion="relacionEdit || { id: 0, odontologo_id: 0, servicio_id: 0 }"
      @guardar="handleGuardar"
      @close="handleCloseDialog"/> -->

  </div>
</template>

<style scoped></style>
