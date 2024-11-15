import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importa Bootstrap
import '@/assets/js/plugins/bootstrap.min.js'
import '@/assets/css/plugins/bootstrap.min.css'

// Importa PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'

// Componentes principales
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
