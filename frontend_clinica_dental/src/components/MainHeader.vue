<script setup lang="ts">
import Button from 'primevue/button'
import { useAuthStore } from '@/stores'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()
const location = useRoute()
</script>

<template>
  <!-- Header Section Start -->
  <div class="section header-section transparent-header">
    <!-- Header Top Start -->
    <div class="header-top d-none d-lg-block">
      <div class="container">
        <!-- Header Top Wrapper Start -->
        <div class="header-top-wrapper">
          <!-- Header Info Start  -->
          <div class="header-top-info">
            <ul>
              <li>
                <i class="ri-map-pin-add-line"></i>
                <span>257 Calle Antofagasta Av. Germán Mendoza</span>
              </li>
              <li>
                <i class="ri-mail-unread-fill"></i>
                <span>info@clinicadental.com</span>
              </li>
              <li><i class="ri-phone-fill"></i> +591 76543210</li>
            </ul>
          </div>
          <!-- Header Info End -->

          <!-- Header Social Start -->
          <div class="header-social">
            <ul class="social">
              <li>
                <a href="#"><i class="ri-facebook-fill"></i></a>
              </li>
              <li>
                <a href="#"><i class="ri-twitter-fill"></i></a>
              </li>
              <li>
                <a href="#"><i class="ri-linkedin-fill"></i></a>
              </li>
              <li>
                <a href="#"><i class="ri-instagram-fill"></i></a>
              </li>
            </ul>
          </div>
          <!-- Header Social End -->
        </div>
        <!-- Header Top Wrapper End -->
      </div>
    </div>
    <!-- Header Top End -->

    <!-- Header Bottom Start -->
    <div class="header-bottom">
      <div class="container">
        <!-- Header Bottom Wrapper Start -->
        <div class="header-bottom-wrapper">
          <!-- Header Logo Start -->
          <div class="header-logo">
            <router-link to="/"
              ><img src="@/assets/images/logo.png" alt="Logo"
            /></router-link>
          </div>
          <!-- Header logo End -->

          <!-- Header Primary Menu Start -->
          <div class="header-primary-menu d-none d-lg-block">
            <ul class="nav-menu">
              <li>
                <router-link to="/" class="active">Inicio</router-link>
              </li>
              <li>
                <router-link v-if="authStore.token" to="/citas"
                  >Citas</router-link
                >
              </li>
              <li>
                <router-link v-if="authStore.token" to="/odontologos"
                  >Odontologos</router-link
                >
              </li>
              <li>
                <router-link v-if="authStore.token" to="/odontologo_servicios"
                  >Servicios</router-link
                >
              </li>
              <li>
                <router-link v-if="authStore.token" to="/clientes"
                  >Clientes</router-link
                >
              </li>
              <li>
                <router-link
                  v-if="!authStore.token"
                  to="/login"
                  style="font-weight: bold"
                >
                  INICIAR SESIÓN
                </router-link>
                <a v-else @click="authStore.logout()" style="font-weight: bold"
                  >Salir</a
                >
              </li>
            </ul>
          </div>
          <!-- Header Primary Menu End -->

          <!-- Header Mobile Toggle Start -->
          <div class="header-toggle d-lg-none">
            <button
              class="menu-toggle"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <!-- Header Mobile Toggle End -->
        </div>
        <!-- Header Bottom Wrapper End -->
      </div>
    </div>
    <!-- Header Bottom End -->
  </div>
  <!-- Header Section End -->

  <!-- Mobile Menu End -->
  <div class="offcanvas offcanvas-start" id="offcanvasMenu">
    <div class="offcanvas-header">
      <a class="logo" href="#"
        ><img src="@/assets/images/logo.png" alt="Logo"
      /></a>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body">
      <!-- Header Info Start  -->
      <div class="header-top-info">
        <ul>
          <li>
            <i class="ri-map-pin-add-line"></i>
            <span>257 Calle Antofagasta Av. Germán Mendoza</span>
          </li>
          <li>
            <i class="ri-mail-unread-fill"></i>
            <span>info@clinicadental.com</span>
          </li>
          <li><i class="ri-phone-fill"></i> +591 76543210</li>
        </ul>
      </div>
      <!-- Header Info End -->

      <!-- Header Social Start -->
      <div class="header-social">
        <ul class="social">
          <li>
            <a href="#"><i class="ri-facebook-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-twitter-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-linkedin-fill"></i></a>
          </li>
          <li>
            <a href="#"><i class="ri-instagram-fill"></i></a>
          </li>
        </ul>
      </div>
      <!-- Header Social End -->

      <div class="mobile-menu">
        <ul class="nav-menu">
          <li>
            <router-link to="/" class="active"> Inicio </router-link>
          </li>
          <li>
            <router-link to="/citas"> Citas </router-link>
          </li>
          <li>
            <router-link to="/odontologos"> Odontologos </router-link>
          </li>
          <li>
            <router-link to="/odontologo_servicios"> Servicios </router-link>
          </li>
          <li>
            <router-link to="/clientes"> Clientes </router-link>
          </li>
          <li>
            <router-link to=""> Contacto </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Mobile Menu End -->
</template>

<style scoped>
</style>
