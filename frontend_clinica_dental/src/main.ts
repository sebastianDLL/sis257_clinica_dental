import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/js/vendor/jquery-1.12.4.min.js';
import '@/assets/js/plugins/popper.min.js';
//import '@popperjs/core';
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
