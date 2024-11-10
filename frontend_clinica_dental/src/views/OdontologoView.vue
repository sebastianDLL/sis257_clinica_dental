<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import OdontologoList from '../components/odontologos/OdontologoList.vue'
import OdontologoSave from '../components/odontologos/OdontologoSave.vue'
const mostrarDialog = ref<boolean>(false)
const OdontologoListRef = ref<typeof OdontologoList | null>(null)
const odontologoEdit = ref<any>(null)

function handleCreate() {
  odontologoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(odontologo: any) {
  odontologoEdit.value = odontologo
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  OdontologoListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-8">
    <h1>Odontologos</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <OdontologoList ref="OdontologoListRef" @edit="handleEdit" />
    <OdontologoSave
      :mostrar="mostrarDialog"
      :odontologo="odontologoEdit"
      :modoEdicion="!!odontologoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
