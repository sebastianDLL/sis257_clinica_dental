<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container">
    <header>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/clientes">Clientes</RouterLink>
          <RouterLink to="/odontologos">Odontologos</RouterLink>
          <RouterLink to="/servicios">Servicios</RouterLink>
          <RouterLink to="/odontologo_servicios"
            >Odontologo Servicios</RouterLink
          >
        </nav>
      </div>
    </header>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

header {
  line-height: 1.5;
  width: 100%;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.content {
  margin-top: 1rem; /* Añade espacio entre el encabezado y la tabla */
  width: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

header,
.table-container {
  max-width: 100%; /* Ajusta esto según el ancho que desees */
  margin: 0 auto;
}

.table-container {
  margin-top: 20px;
}
</style>
