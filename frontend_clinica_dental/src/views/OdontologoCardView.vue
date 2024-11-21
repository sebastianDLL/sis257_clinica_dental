<script setup lang="ts">
import { ref } from 'vue'
import OdontologosListCard from '@/components/odontologos/OdontologosListCard.vue';

const OdontologoListCardRef = ref<typeof OdontologosListCard | null>(null)
</script>

<template>
  <div class="slider-background">

    <div class="contenedor">
      <h1 class="page-title">Nuestros Odontologos</h1>
      <OdontologosListCard ref="OdontologoListCardRef" />
    </div>
  </div>
</template>


<style scoped>
.slider-background {
  background: linear-gradient(to bottom, #240090, #5a33cc); /* Gradiente atractivo */
  min-height: 100vh; /* Altura completa de la pantalla */
  display: flex; /* Flexbox para posicionar el contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  padding: 2rem; /* Espaciado interno */
  color: white; /* Color de texto blanco para buen contraste */
  font-family: Arial, sans-serif; /* Fuente simple y profesional */
}

.contenedor {
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco semitransparente */
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* Sombra elegante */
  padding: 2rem; /* Espaciado interno */
  width: 90%; /* Ajusta el ancho al 90% del contenedor */
  max-width: 1200px; /* Ancho máximo para pantallas grandes */
  text-align: center; /* Centrar texto dentro del contenedor */
  margin-top: 200px;
}

.page-title {
  font-size: 2rem; /* Tamaño de fuente grande */
  margin-bottom: 1rem; /* Espaciado inferior */
  color : #240090;
}
</style>

