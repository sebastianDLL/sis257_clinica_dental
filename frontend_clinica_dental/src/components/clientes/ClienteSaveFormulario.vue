<script setup lang="ts">
import { ref } from 'vue';
import type { Cliente } from '@/models/Cliente';
import http from '../../plugins/axios';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import { useRouter } from 'vue-router';

const ENDPOINT = 'clientes';
const cliente = ref<Cliente>({
  id: 0,
  nombre: '',
  primerApellido: '',
  segundoApellido: '',
  password: '',
  email: '',
  telefono: '',
  direccion: '',
});


const router = useRouter();

async function handleSave() {
  try {
    const body = {
      nombre: cliente.value.nombre,
      primerApellido: cliente.value.primerApellido,
      segundoApellido: cliente.value.segundoApellido,
      password: cliente.value.password,
      email: cliente.value.email,
      telefono: cliente.value.telefono,
      direccion: cliente.value.direccion,
    };

    await http.post(ENDPOINT, body);
    alert('Cuenta creada con éxito.');
    router.push('/login'); // Redirige al login después de crear la cuenta
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al crear la cuenta.');
  }
}
</script>

<template>
  <div class="create-container">
    <div class="form-group">
      <label for="nombre">Nombre</label>
      <InputText id="nombre" v-model="cliente.nombre" />
    </div>
    <div class="form-group">
      <label for="primer_apellido">Primer Apellido</label>
      <InputText id="primer_apellido" v-model="cliente.primerApellido" />
    </div>
    <div class="form-group">
      <label for="segundo_apellido">Segundo Apellido</label>
      <InputText id="segundo_apellido" v-model="cliente.segundoApellido" />
    </div>
    <div class="form-group">
      <label for="contraseña">Contraseña</label>
      <Password id="contraseña" v-model="cliente.password" required toggleMask
        weakLabel="Débil" mediumLabel="Media" strongLabel="Fuerte" maxlength="50">
        <template #footer>
          <Divider />
          <p class="mt-1 suggestions">Sugerencias</p>
          <ul>
            <li>Al menos una minúscula</li>
            <li>Al menos una mayúscula</li>
            <li>Un número</li>
            <li>Mínimo 8 caracteres</li>
          </ul>
        </template>
      </Password>
    </div>

    <div class="form-group">
      <label for="email">Correo</label>
      <InputText id="email" v-model="cliente.email" />
    </div>
    <div class="form-group">
      <label for="telefono">Teléfono</label>
      <InputText id="telefono" v-model="cliente.telefono" />
    </div>
    <div class="form-group">
      <label for="direccion">Dirección</label>
      <InputText id="direccion" v-model="cliente.direccion" />
    </div>
    <div class="form-actions">
      <Button label="Guardar" icon="pi pi-save" @click="handleSave" />
    </div>
  </div>
</template>

<style scoped>
.create-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#contraseña{
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.password-group {
  position: relative;
}

.password-wrapper {
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 10px;
  cursor: pointer;
  border: none;
  background: none;
  color: #555;
  font-size: 1.2rem;
}

.password-toggle:hover {
  color: #000;
}

.form-actions {
  text-align: center;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
