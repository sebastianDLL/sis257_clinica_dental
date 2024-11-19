<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import OdontologoList from '../components/odontologos/OdontologoList.vue'
import OdontologoSave from '../components/odontologos/OdontologoSave.vue'
const mostrarDialog = ref<boolean>(false)
const OdontologoListRef = ref<typeof OdontologoList | null>(null)
const odontologoEdit = ref<any>(null)

function handleCreate() {
  odontologoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(odontologo: any) {
  odontologoEdit.value = odontologo
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  OdontologoListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="header-section">
        <h1 class="page-title">Gestión de Odontólogos</h1>
        <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" class="create-button" />
      </div>
      <div class="list-container">
        <OdontologoList ref="OdontologoListRef" @edit="handleEdit" />
      </div>
      <OdontologoSave :mostrar="mostrarDialog" :odontologo="odontologoEdit" :modoEdicion="!!odontologoEdit"
        @guardar="handleGuardar" @close="handleCloseDialog" />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  margin-top: 10%;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #240090;
  /* Color morado/índigo para coincidir con tu tema */
  margin: 0;
}

.create-button {
  background-color: #008000 !important;
  /* Verde para coincidir con tu marca */
  border: none !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 6px !important;
}

.create-button:hover {
  background-color: #006400 !important;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

.list-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }

  .header-section {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    text-align: center;
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .create-button {
    width: 100%;
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

.page-container {
  animation: fadeIn 0.3s ease-out;
}
</style>
