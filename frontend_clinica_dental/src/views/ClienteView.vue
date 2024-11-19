<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '../plugins/axios'
import ClienteList from '../components/clientes/ClienteList.vue'
import ClienteSave from '../components/clientes/ClienteSave.vue'
import CambiarPasswordDialog from '../components/clientes/CambiarPasswordDialog.vue'
import Dialog from 'primevue/dialog'
import type { Cliente } from '../models/Cliente' // Importar el modelo

// Estado
const cliente = ref<Cliente | null>(null) // Datos del cliente autenticado
const mostrarDialog = ref(false) // Controla la visibilidad del diálogo
const mostrarDialogPassword = ref(false) // Controla la visibilidad del diálogo de cambiar contraseña

// Cargar datos del cliente autenticado
async function cargarClienteAutenticado() {
  try {
    cliente.value = await http
      .get('clientes/mi-perfil')
      .then(response => response.data)
  } catch (error) {
    console.error('Error al cargar los datos del cliente:', error)
    alert('No se pudieron cargar los datos del cliente.')
  }
}

// Cambiar contraseña
async function cambiarPassword(passwordActual: string, nuevaPassword: string) {
  try {
    const response = await http.post('clientes/cambiar-password', {
      passwordActual,
      nuevaPassword,
    });
    mostrarDialogPassword.value = false // Cerrar el diálogo
    alert(response.data);
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error)
    alert('No se pudo cambiar la contraseña.')
  }
}

// Guardar cambios en el servidor
async function guardarCambios(clienteActualizado: Cliente) {
  try {
    await http.patch(`clientes/${clienteActualizado.id}`, clienteActualizado)
    cliente.value = { ...clienteActualizado } // Actualizar los datos locales
    mostrarDialog.value = false // Cerrar el diálogo
    alert('Datos actualizados correctamente.')
  } catch (error) {
    console.error('Error al guardar los cambios:', error)
    alert('No se pudieron guardar los cambios.')
  }
}

// Inicializar datos al montar el componente
onMounted(() => {
  cargarClienteAutenticado()
})
</script>

<template>
  <div class="slider-background">
    <div class="content-container">
      <h1 class="title">Mi Perfil</h1>
      <div v-if="cliente">
        <!-- Muestra los datos del cliente -->
        <ClienteList
          :cliente="cliente"
          @editar="mostrarDialog = true"
          @cambiarPassword="mostrarDialogPassword = true"
        />

        <!-- Diálogo para editar los datos -->
        <Dialog
          v-model:visible="mostrarDialog"
          header="Editar Perfil"
          :style="{ width: '30rem' }"
          modal
        >
          <ClienteSave
            :cliente="{ ...cliente }"
            :modoEdicion="true"
            @guardar="guardarCambios"
          />
        </Dialog>

        <!-- Diálogo para cambiar la contraseña -->
        <Dialog
          v-model:visible="mostrarDialogPassword"
          header="Cambiar Contraseña"
          :style="{ width: '30rem' }"
          modal
        >
          <CambiarPasswordDialog
            @guardar="cambiarPassword"
            @cerrar="mostrarDialogPassword = false"
          />
        </Dialog>
      </div>
      <p v-else>Cargando datos del cliente...</p>
    </div>
  </div>
</template>
<style scoped>
.slider-background {
  background-color: #2700c1; /* Fondo sólido con el color especificado */
  min-height: 100vh; /* Asegura que cubra al menos el alto de la ventana */
  display: flex; /* Flexbox para centrar el contenido */
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: flex-start; /* Alinea el contenido al inicio vertical */
  padding: 2rem; /* Espaciado interno */
}
.content-container {
  background: rgba(255, 255, 255, 0.9); /* Fondo blanco semitransparente */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
  padding: 2rem; /* Espaciado interno */
  width: 100%; /* Ajusta al contenedor */
  max-width: 1000px; /* Ancho máximo */
  margin-top: 200px; /* Espaciado superior */
}
.title {
  font-size: 2rem; /* Tamaño del título */
  text-align: center; /* Centrado del título */
  margin-bottom: 1.5rem; /* Espaciado inferior */
}
</style>
