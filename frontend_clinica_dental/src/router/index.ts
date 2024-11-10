import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
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
  ],
})

export default router
