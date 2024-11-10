<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import ServicioList from '../components/servicios/ServicioList.vue'
import ServicioSave from '../components/servicios/ServicioSave.vue'

const mostrarDialog = ref<boolean>(false)
const ServicioListRef = ref<typeof ServicioList | null>(null)
const servicioEdit = ref<any>(null)

function handleCreate() {
  servicioEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(servicio: any) {
  servicioEdit.value = servicio
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  ServicioListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Servicios</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ServicioList ref="ServicioListRef" @edit="handleEdit" />
    <ServicioSave
      :mostrar="mostrarDialog"
      :servicio="servicioEdit"
      :modoEdicion="!!servicioEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
