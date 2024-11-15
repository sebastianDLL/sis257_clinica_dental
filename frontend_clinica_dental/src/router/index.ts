import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getTokenFromLocalStorage } from '@/helpers'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requireMainJs: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/citas',
      name: 'citas',
      component: () => import('../views/CitaView.vue'),
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
    },
    {
      path: '/odontologos',
      name: 'odontologos',
      component: () => import('../views/OdontologoView.vue'),
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('../views/ServiciosView.vue'),
    },
    {
      path: '/odontologo_servicios',
      name: 'odontologo_servicios',
      component: () => import('../views/OdontologoServiciosView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    }
  ],
})

router.beforeEach(async to => {
  const publicPages = ['/', '/login']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout()
    authStore.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
