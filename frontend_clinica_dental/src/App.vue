<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import '@/assets/js/vendor/modernizr-3.11.2.min.js'
import 'https://code.jquery.com/jquery-1.12.4.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.7/umd/popper.min.js'
import '@/assets/js/plugins/bootstrap.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.13/combined/js/gijgo.min.js'
import '@/assets/js/plugins/jquery.magnific-popup.min.js'
import '@/assets/js/main.js'

import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'

// Reimporta `main.js` en cada navegación
const route = useRoute()

onMounted(async () => {
  
  // Inicializa los scripts necesarios después de que el DOM esté renderizado
  const { default: initializeMainScripts } = await import('@/assets/js/main.js')
  initializeMainScripts()

  // Asegúrate de que todos los scripts que dependen de jQuery también se inicialicen aquí
  $(document).ready(() => {
    console.log('Document ready - inicializando scripts adicionales')
    // Inicializar cualquier plugin de jQuery o lógica adicional aquí
  })
})

// Escucha cambios de ruta para ejecutar `main.js` nuevamente
watch(route, async newRoute => {
  if (newRoute.path === '/') {
    const { default: initializeMainScripts } = await import(
      '@/assets/js/main.js'
    )
    initializeMainScripts()
  }
})
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>

<style>
/* Icon Font CSS */
@import '@/assets/css/plugins/font-awesome.min.css';
@import '@/assets/css/plugins/remixicon.css';
@import '@/assets/css/plugins/flaticon.css';

/* Bootstrap CSS */
@import '@/assets/css/plugins/bootstrap.min.css';

/* Animaciones CSS */
@import '@/assets/css/plugins/animate.min.css';
/* Slick Carousel CSS */
@import 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css';

/* Nice Select */
@import 'https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/css/nice-select.css';

/* Gijgo CSS */
@import 'https://cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.13/combined/css/gijgo.min.css';

/* Magnific Popup CSS */
@import 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css';

/* Preloader (local si no hay CDN disponible) */
@import '@/assets/css/plugins/preloader.css';
/* Main Style CSS */
@import '@/assets/css/style.css';
</style>
