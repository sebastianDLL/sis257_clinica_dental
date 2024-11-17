import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Importa Bootstrap
import '@/assets/js/plugins/bootstrap.min.js';
import '@/assets/css/plugins/bootstrap.min.css';

// Importa PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';

import App from './App.vue';
import router from './router';

// Crea la aplicación de Vue
const app = createApp(App);

// Crea la instancia de Pinia (solo una vez)
const pinia = createPinia();

// Usa Pinia, Router y PrimeVue en la aplicación
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

// Monta la aplicación en el DOM
app.mount('#app');
