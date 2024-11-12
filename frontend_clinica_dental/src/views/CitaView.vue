<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import CitaList from '../components/citas/CitaList.vue'
import CitaSave from '../components/citas/CitaSave.vue'

const mostrarDialog = ref<boolean>(false)
const CitaListRef = ref<typeof CitaList | null>(null)
const citaEdit = ref<any>(null)

function handleCreate() {
  citaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(cita: any) {
  citaEdit.value = cita
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  CitaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Citas</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <CitaList ref="CitaListRef" @edit="handleEdit" />
    <CitaSave
      :mostrar="mostrarDialog"
      :cita="citaEdit"
      :modoEdicion="!!citaEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
