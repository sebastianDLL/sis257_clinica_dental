<template>
    <div class="unauthorized-container">
      <h1>Acceso Denegado</h1>
      <p>Lo siento, no tienes permisos para acceder a esta página.</p>
      <router-link to="/" class="go-home-link">Volver al inicio</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .unauthorized-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
    color: #ff4d4f;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
  
  .go-home-link {
    font-size: 1rem;
    color: #007bff;
    text-decoration: none;
  }
  
  .go-home-link:hover {
    text-decoration: underline;
  }
  </style>
  