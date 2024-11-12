<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';

// Importa estilos y scripts desde CDNs
import '@/assets/js/vendor/modernizr-3.11.2.min.js';
import 'https://code.jquery.com/jquery-1.12.4.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.7/umd/popper.min.js';
//import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.min.js';
import '@/assets/js/plugins/bootstrap.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/gijgo/1.9.13/combined/js/gijgo.min.js';
import '@/assets/js/plugins/jquery.magnific-popup.min.js';

import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

// Reimporta `main.js` en cada navegación
const route = useRoute();

onMounted(async () => {
  // Ejecutar `main.js` al cargar la aplicación
  const { default: initializeMainScripts } = await import('@/assets/js/main.js');
  initializeMainScripts();
});

// Escucha cambios de ruta para ejecutar `main.js` nuevamente
watch(route, async (newRoute) => {
  if (newRoute.path === '/') {
    const { default: initializeMainScripts } = await import('@/assets/js/main.js');
    initializeMainScripts();
  }
});
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
/*@import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';*/
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
