<script setup lang="ts">
import type { Cliente } from '../../models/Cliente'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'clientes'
let clientes = ref<Cliente[]>([])

const emit = defineEmits(['edit'])
const clienteDelete = ref<Cliente | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  clientes.value = await http.get(ENDPOINT).then(response => response.data)
}

function emitirEdicion(cliente: Cliente) {
  emit('edit', cliente)
}

function mostrarEliminarConfirm(cliente: Cliente) {
  clienteDelete.value = cliente
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${clienteDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="clients-container">
    <div class="table-wrapper">
      <table class="clients-table">
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="cliente.id">
            <td>{{ index + 1 }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.primerApellido }}</td>
            <td>{{ cliente.segundoApellido }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.telefono }}</td>
            <td class="actions-column">
              <Button icon="pi pi-pencil" aria-label="Editar" text class="edit-button"
                @click="emitirEdicion(cliente)" />
              <Button icon="pi pi-trash" aria-label="Eliminar" text class="delete-button"
                @click="mostrarEliminarConfirm(cliente)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }"
      class="delete-dialog">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="dialog-footer">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false"
          class="cancel-button" />
        <Button type="button" label="Eliminar" @click="eliminar" class="confirm-delete-button" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.clients-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.table-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.clients-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.clients-table th {
  background-color: #240090;
  /* Color morado/índigo */
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.clients-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.clients-table tbody tr:hover {
  background-color: #f8f9fa;
}

.actions-column {
  white-space: nowrap;
  width: 100px;
}

.edit-button {
  color: #008000 !important;
  /* Verde para coincidir con tu marca */
}

.delete-button {
  color: #dc2626 !important;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #f3f4f6 !important;
  border-radius: 4px;
}

/* Estilos para el diálogo de confirmación */
.delete-dialog {
  border-radius: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.cancel-button {
  background-color: #e5e7eb !important;
  color: #374151 !important;
}

.confirm-delete-button {
  background-color: #dc2626 !important;
  color: white !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .clients-container {
    padding: 1rem;
  }

  .table-wrapper {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>