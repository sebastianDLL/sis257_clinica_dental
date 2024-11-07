<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import ClienteList from '../components/clientes/ClienteList.vue'
import ClienteSave from '../components/clientes/ClienteSave.vue';

const mostrarDialog = ref<boolean>(false);
const ClienteListRef = ref<typeof ClienteList | null >(null);
const clienteEdit = ref<any>(null);

function handleCreate() {
  clienteEdit.value=null;
  mostrarDialog.value=true;
}

function handleEdit(cliente: any) {
  clienteEdit.value=cliente;
  mostrarDialog.value=true;
}

function handleCloseDialog() {
  mostrarDialog.value=false;
}

function handleGuardar() {
  ClienteListRef.value?.obtenerLista();
}

</script>

<template>
  <div class="m-8">
    <h1>Clientes</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ClienteList ref="ClienteListRef" @edit="handleEdit"  />
    <ClienteSave 
    :mostrar="mostrarDialog"
    :cliente="clienteEdit"
    :modoEdicion="!!clienteEdit"
    @guardar="handleGuardar"
    @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>