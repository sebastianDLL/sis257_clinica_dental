<script setup lang="ts">
import type { Cita } from '../../models/Cita'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'citas'
let citas = ref<Cita[]>([])

const emit = defineEmits(['edit'])
const citaDelete = ref<Cita | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  citas.value = await http.get(ENDPOINT).then(response => response.data)
}

function emitirEdicion(cita: Cita) {
  emit('edit', cita)
}

function mostrarEliminarConfirm(cita: Cita) {
  citaDelete.value = cita
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${citaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Cliente</th>
          <th>Odontologo</th>
          <th>Servicio</th>
          <th>Estado</th>
          <th>Fecha y Hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cita, index) in citas" :key="cita.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cita.cliente.nombre }}</td>
          <td>{{ cita.odontologo.nombre }}</td>
          <td>{{ cita.servicio.nombre }}</td>
          <td>{{ cita.estado }}</td>  
          <td>{{ cita.fechaHoraCita }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(cita)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(cita)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
