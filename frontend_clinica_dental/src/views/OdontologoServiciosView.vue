<script setup lang="ts">
import { ref } from 'vue'
import OdontologoServicioSave from '@/components/odontologo_servicios/OdontologoServicioSave.vue'
import OdontologoServicioList from '@/components/odontologo_servicios/OdontologoServicioList.vue'
import ServicioSave from '../components/servicios/ServicioSave.vue'
import Button from 'primevue/button'

import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

const mostrarDialog2 = ref<boolean>(false)

const mostrarDialogCreate = ref(false)
const OdontologoServicioListRef = ref<InstanceType<
  typeof OdontologoServicioList
> | null>(null)

// Función para manejar la creación
function handleCreate() {
  mostrarDialogCreate.value = true
}

// Función para cerrar el diálogo
function handleCloseDialog() {
  mostrarDialogCreate.value = false
}

// Función para actualizar la lista después de guardar
function handleGuardar() {
  if (OdontologoServicioListRef.value) {
    OdontologoServicioListRef.value.obtenerLista() // Actualiza la lista
  }
  mostrarDialogCreate.value = false
}

function handleCreate2() {
  mostrarDialog2.value = true
}
function handleGuardar2() {
  mostrarDialog2.value = false
  mostrarDialogCreate.value = false
  if (OdontologoServicioListRef.value) {
    OdontologoServicioListRef.value.obtenerLista()
  }
}
function handleCloseDialog2() {
  mostrarDialog2.value = false
  mostrarDialogCreate.value = false
}

</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="header-container">
        <Button
          class="btn-crear-servicio create-button"
          label="Crear servicio"
          icon="pi pi-plus"
          @click="handleCreate2"
        />

        <h1 class="header">
          Bienvenido!! {{ authStore.user?.name || 'Usuario' }}, estos son sus
          servicios.
        </h1>
      </div>

      <Button
        label="Añadir servicio"
        icon="pi pi-plus"
        class="create-button"
        @click="handleCreate"
      />

      <!-- Lista de relaciones -->
      <OdontologoServicioList
        ref="OdontologoServicioListRef"
        class="list-container"
      />

      <!-- Diálogo de creación -->
      <OdontologoServicioSave
        :mostrar="mostrarDialogCreate"
        @guardar="handleGuardar"
        @close="handleCloseDialog"
        class="dialog-container"
      />
      <!-- Diálogo de crear servicio -->
      <ServicioSave
        :mostrar="mostrarDialog2"
        @guardar="handleGuardar2"
        @close="handleCloseDialog2"
      />
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.container {
  background-color: #2700c1; /* Fondo sólido */
  display: flex; /* Flexbox para centrar el contenido */
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: flex-start; /* Alinea el contenido al inicio vertical */
  padding-top: 200px;
  min-height: 100vh;
  max-width: 100%;
}

/* Contenedor interno */
.content-wrapper {
  background-color: #ffffff; /* Fondo blanco para el contenido */
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra ligera */
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  text-align: center;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-container .btn-crear-servicio {
  margin-right: auto; /* Esto empuja el botón a la izquierda */
}
/* Título */
.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  flex: 1;
  text-align: center;
}

/* Botón de creación */
.create-button {
  background-color: #37810c; /* Verde */
  color: #ffffff; /* Texto blanco */
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1.5rem;
}

.create-button:hover {
  background-color: #0056b3; /* Azul más oscuro al pasar el mouse */
}

/* Contenedor de la lista */
.list-container {
  margin-top: 2rem;
}

/* Diálogo animado */
.dialog-container-enter-active,
.dialog-container-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-container-enter-from,
.dialog-container-leave-to {
  opacity: 0;
}
</style>
