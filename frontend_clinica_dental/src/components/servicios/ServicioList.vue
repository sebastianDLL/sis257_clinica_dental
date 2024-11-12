<script setup lang="ts">
import type { Servicios } from '../../models/Servicios'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'servicios'
let servicios = ref<Servicios[]>([])

const emit = defineEmits(['edit'])
const servicioDelete = ref<Servicios | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

/*async function obtenerLista() {
  servicios.value = await http.get(ENDPOINT).then((response) => response.data)
}*/

async function obtenerLista() {
  servicios.value = await http.get(ENDPOINT).then(response => response.data)
  servicios.value.sort((a, b) => a.id - b.id) // Ordenar por ID
}

function emitirEdicion(servicio: Servicios) {
  emit('edit', servicio)
}

function mostrarEliminarConfirm(servicio: Servicios) {
  servicioDelete.value = servicio
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${servicioDelete.value?.id}`)
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
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio <br />(Bs)</th>
          <th>
            Duración <br />
            (minutos)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(servicio, index) in servicios" :key="servicio.id">
          <td>{{ index + 1 }}</td>
          <td>{{ servicio.nombre }}</td>
          <td>{{ servicio.descripcion }}</td>
          <td>{{ servicio.precio }}</td>
          <td>{{ servicio.duracion }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(servicio)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(servicio)"
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
