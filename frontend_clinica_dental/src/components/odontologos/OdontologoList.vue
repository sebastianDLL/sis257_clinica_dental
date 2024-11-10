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
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Especialidad</th>
          <th>Correo</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(odontologo, index) in odontologos" :key="odontologo.id">
          <td>{{ index + 1 }}</td>
          <td>{{ odontologo.nombre }}</td>
          <td>{{ odontologo.primerApellido }}</td>
          <td>{{ odontologo.segundoApellido }}</td>
          <td>{{ odontologo.especialidad }}</td>
          <td>{{ odontologo.email }}</td>
          <td>{{ odontologo.telefono }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(odontologo)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(odontologo)"
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
