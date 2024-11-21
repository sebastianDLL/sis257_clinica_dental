<script setup lang="ts">
import type { Odontologo } from '../../models/Odontologo'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'odontologos'
let odontologos = ref<Odontologo[]>([])

const emit = defineEmits(['edit'])

async function obtenerLista() {
  odontologos.value = await http.get(ENDPOINT).then(response => response.data)
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="dentists-container">
    <div class="row g-4">
      <div
        class="col-md-6 col-lg-4"
        v-for="(odontologo, index) in odontologos"
        :key="odontologo.id"
      >
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary text-white">
            <h5 class="card-title mb-0">
             <strong>Dr. </strong> {{ odontologo.nombre }} {{ odontologo.primerApellido }}
            </h5>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">
              {{ odontologo.especialidad }}
            </h6>
            <p class="card-text">
              <strong>Correo:</strong> {{ odontologo.email }} <br />
              <strong>Teléfono:</strong> {{ odontologo.telefono }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.dentists-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff, #cfe9ff); /* Fondo con gradiente */
  border-radius: 12px;
}

/* Estilos de la tarjeta */
.card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px); /* Efecto de elevación */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); /* Sombra más visible */
}

/* Encabezado de la tarjeta */
.card-header {
  background-color: #0069d9; /* Azul oscuro */
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
}

/* Cuerpo de la tarjeta */
.card-body {
  padding: 1rem;
  background-color: white; /* Fondo blanco para contraste */
}

.card-subtitle {
  font-size: 0.95rem;
  color: #6c757d; /* Texto gris */
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.9rem;
  color: #212529;
}

/* Pie de la tarjeta */
.card-footer {
  background-color: #f8f9fa;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Botones */
.edit-button {
  background-color: #28a745 !important; /* Verde */
  color: white !important;
}

.delete-button {
  background-color: #dc3545 !important; /* Rojo */
  color: white !important;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.85;
}

/* Respuesta para dispositivos móviles */
@media (max-width: 768px) {
  .dentists-container {
    padding: 1rem;
  }

  .card {
    font-size: 0.9rem;
  }
}
</style>
