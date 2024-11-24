<script setup lang="ts">
import type { Servicios } from '../../models/Servicios'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { computed, ref, watch } from 'vue'
import { Textarea } from 'primevue'

const ENDPOINT = 'servicios'
const props = defineProps({
  mostrar: Boolean,
  servicio: {
    type: Object as () => Servicios,
    default: () => ({}) as Servicios,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

const servicio = ref<Servicios>({ ...props.servicio })
watch(
  () => props.mostrar,
  newVal => {
    if (newVal) {
      servicio.value = props.modoEdicion
        ? {
            ...props.servicio,
            precio: Math.round(props.servicio.precio * 100) / 100,
          }
        : ({
            nombre: '',
            descripcion: '',
            precio: 0,
            duracion: '',
          } as Servicios)
    }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: servicio.value.nombre,
      descripcion: servicio.value.descripcion,
      precio: servicio.value.precio,
      duracion: servicio.value.duracion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${servicio.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    servicio.value = {} as Servicios
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="servicio.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-4">Descripción</label>
        <Textarea
          id="descripcion"
          v-model="servicio.descripcion"
          autoResize
          rows="5"
          cols="30"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-4">Precio</label>
        <InputNumber
          id="precio"
          v-model="servicio.precio"
          class="flex-auto"
          autocomplete="off"
          :step="0.01"
          :min="0"
          :mode="'decimal'"
          :locale="'es-BO'"
          :decimalSeparator="'.'"
          :useGrouping="false"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracion" class="font-semibold w-4">Duración</label>
        <InputText
          id="duracion"
          v-model="servicio.duracion"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        />
        <Button
          type="button"
          label="Guardar"
          icon="pi pi-save"
          @click="handleSave"
        />
      </div>
    </Dialog>
  </div>
</template>
