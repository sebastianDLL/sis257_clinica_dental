<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const clave = ref('')
const error = ref(false)

function onSubmit() {
  const authStore = useAuthStore()
  authStore.login(usuario.value, clave.value).catch(() => (error.value = true))
}
</script>

<template>
  <div class="auth-container my-5 pt-5">
    <h1 class="auth-title">Iniciar Sesión</h1>
    <form class="auth-form" @submit.prevent="onSubmit">
      <label class="auth-label">Usuario:</label>
      <input
        v-model="usuario"
        type="text"
        class="auth-input"
        placeholder="Ingrese su usuario"
        autofocus
      />

      <label class="auth-label">Contraseña:</label>
      <input
        v-model="clave"
        type="password"
        class="auth-input"
        placeholder="Ingrese su contraseña"
      />

      <p v-if="error" class="auth-error">Usuario y/o contraseña incorrectos</p>
      <button type="submit" class="auth-submit">Ingresar</button>
    </form>
  </div>
</template>
<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.auth-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.auth-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.auth-label {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
}

.auth-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.auth-input:focus {
  border-color: #ee5007;
  outline: none;
  box-shadow: 0 0 5px rgba(238, 80, 7, 0.5);
}

.auth-error {
  font-size: 0.9rem;
  color: #ff4d4f;
  margin-bottom: 1rem;
  text-align: center;
}

.auth-submit {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #ee5007;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.auth-submit:hover {
  background-color: #d94505;
}

.auth-submit:active {
  transform: scale(0.98);
}
</style>
