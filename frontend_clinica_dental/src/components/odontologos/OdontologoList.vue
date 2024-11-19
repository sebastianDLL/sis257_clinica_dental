<script setup lang="ts">
import type { Odontologo } from '../../models/Odontologo'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'odontologos'
let odontologos = ref<Odontologo[]>([])

const emit = defineEmits(['edit'])
const odontologoDelete = ref<Odontologo | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  odontologos.value = await http.get(ENDPOINT).then(response => response.data)
}

function emitirEdicion(odontologo: Odontologo) {
  emit('edit', odontologo)
}

function mostrarEliminarConfirm(odontologo: Odontologo) {
  odontologoDelete.value = odontologo
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${odontologoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="dentists-container">
    <div class="table-wrapper">
      <table class="dentists-table">
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Especialidad</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(odontologo, index) in odontologos" :key="odontologo.id">
            <td>{{ index + 1 }}</td>
            <td>{{ odontologo.nombre }}</td>
            <td>{{ odontologo.primerApellido }}</td>
            <td>{{ odontologo.segundoApellido }}</td>
            <td>
              <span class="specialty-tag">{{ odontologo.especialidad }}</span>
            </td>
            <td>{{ odontologo.email }}</td>
            <td>{{ odontologo.telefono }}</td>
            <td class="actions-column">
              <Button icon="pi pi-pencil" aria-label="Editar" text class="edit-button"
                @click="emitirEdicion(odontologo)" />
              <Button icon="pi pi-trash" aria-label="Eliminar" text class="delete-button"
                @click="mostrarEliminarConfirm(odontologo)" />
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
.dentists-container {
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

.dentists-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.dentists-table th {
  background-color: #240090;
  /* Color morado/índigo */
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.dentists-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.dentists-table tbody tr:hover {
  background-color: #f8f9fa;
}

.specialty-tag {
  background-color: #e8f5e9;
  color: #008000;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
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
  .dentists-container {
    padding: 1rem;
  }

  .table-wrapper {
    border-radius: 0;
    box-shadow: none;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dentists-container {
  animation: fadeIn 0.3s ease-out;
}
</style>