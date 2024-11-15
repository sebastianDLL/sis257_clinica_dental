<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/index';

const email = ref('');
const clave = ref('');
const error = ref('');
const isSubmitting = ref(false); // Estado para deshabilitar el botón mientras se envía el formulario

function onSubmit() {
  const authStore = useAuthStore();
  isSubmitting.value = true; // Deshabilita el botón

  authStore
    .login(email.value, clave.value)
    .then(() => {
      error.value = ''; // Resetea el error en caso de éxito
    })
    .catch((err) => {
      error.value = err.message || 'Error al iniciar sesión'; // Muestra el mensaje de error
    })
    .finally(() => {
      isSubmitting.value = false; // Habilita el botón después de completar la solicitud
    });
}
</script>

<template>
  <div class="section slider-area slider-active">
    <!-- Single Slider Start -->
    <div
      class="single-slider bg-cover d-flex align-items-center justify-content-center slider-background"
    >
      <div class="auth-container my-5 pt-5">
        <h1 class="auth-title">Iniciar Sesión</h1>
        <form class="auth-form" @submit.prevent="onSubmit">
          <label class="auth-label">Correo:</label>
          <input
            v-model="email"
            type="email"
            class="auth-input"
            placeholder="Ingrese su email"
            required
            autofocus
          />

          <label class="auth-label">Contraseña:</label>
          <input
            v-model="clave"
            type="password"
            class="auth-input"
            placeholder="Ingrese su contraseña"
            required
          />

          <p v-if="error" class="auth-error">
            {{ error }}
          </p>
          <button type="submit" class="auth-submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mantengo tus estilos originales */
.slider-background {
  background-image: url('@/assets/images/slider/slider-1.png');
}

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.auth-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #009024; /* Verde oscuro */
  margin-bottom: 0;
  text-align: center;
}

.auth-form {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background-color: #ffffff; /* Blanco */
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid #2e7d32; /* Borde verde */
  margin-top: 1.5 rem;
}

.auth-label {
  font-size: 1rem;
  color: #2e7d32; /* Verde oscuro */
  margin-bottom: 0.5rem;
  display: block;
  font-weight: bold;
}

.auth-input {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #64b5f6; /* Azul claro */
  border-radius: 6px;
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.auth-input:focus {
  border-color: #1976d2; /* Azul fuerte */
  outline: none;
  box-shadow: 0 0 6px rgba(25, 118, 210, 0.5); /* Sombra azul */
}

.auth-error {
  font-size: 0.9rem;
  color: #d32f2f; /* Rojo */
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
}

.auth-submit {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.1rem;
  color: white;
  background-color: #2e7d32; /* Verde oscuro */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s,
    box-shadow 0.3s;
}

.auth-submit:hover {
  background-color: #1b5e20; /* Verde más oscuro */
  box-shadow: 0 4px 15px rgba(27, 94, 32, 0.5); /* Sombra verde */
}

.auth-submit:active {
  transform: scale(0.96);
}

.slider-background {
  background-color: #e3f2fd; /* Azul muy claro */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 100vh;
}

body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f1f8e9; /* Fondo verde muy claro */
}
</style>
