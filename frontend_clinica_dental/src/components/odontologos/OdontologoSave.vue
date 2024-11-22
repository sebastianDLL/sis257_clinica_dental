<script setup lang="ts">
import type { Odontologo } from '../../models/Odontologo'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'odontologos'
const props = defineProps({
  mostrar: Boolean,
  odontologo: {
    type: Object as () => Odontologo,
    default: () => ({}) as Odontologo,
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

const odontologo = ref<Odontologo>({ ...props.odontologo })
watch(
  () => props.odontologo,
  newVal => {
    odontologo.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: odontologo.value.nombre,
      primerApellido: odontologo.value.primerApellido,
      segundoApellido: odontologo.value.segundoApellido,
      especialidad: odontologo.value.especialidad,
      password: odontologo.value.password,
      email: odontologo.value.email,
      telefono: odontologo.value.telefono,
      direccion: odontologo.value.direccion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${odontologo.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    odontologo.value = {} as Odontologo
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
        <label for="nombre" class="font-semibold w-24">Nombre</label>
        <InputText
          id="nombre"
          v-model="odontologo.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="primer_apellido" class="font-semibold w-24"
          >Primer Apellido</label
        >
        <InputText
          id="primer_apellido"
          v-model="odontologo.primerApellido"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="segundo_apellido" class="font-semibold w-24"
          >Segundo Apellido</label
        >
        <InputText
          id="segundo_apellido"
          v-model="odontologo.segundoApellido"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="especialidad" class="font-semibold w-24"
          >Especialidad</label
        >
        <InputText
          id="especialidad"
          v-model="odontologo.especialidad"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="password" class="font-semibold w-24">Contraseña</label>
        <Password
          id="password"
          v-model="odontologo.password"
          :disabled="props.modoEdicion"
          :toggleMask="!props.modoEdicion"
          :feedback="!props.modoEdicion"
          class="flex-auto"
          autocomplete="off"
          weakLabel="Débil"
          mediumLabel="Media"
          strongLabel="Fuerte"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="email" class="font-semibold w-24">Correo</label>
        <InputText
          id="email"
          v-model="odontologo.email"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="telefono" class="font-semibold w-24">Teléfono</label>
        <InputText
          id="telefono"
          v-model="odontologo.telefono"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="direccion" class="font-semibold w-24">Dirección</label>
        <InputText
          id="direccion"
          v-model="odontologo.direccion"
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
        ></Button>
        <Button
          type="button"
          label="Guardar"
          icon="pi pi-save"
          @click="handleSave"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
