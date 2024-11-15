import { defineStore } from 'pinia'
import { getTokenFromLocalStorage } from '../helpers'
import http from '../plugins/axios'
import router from '@/router'
import { AxiosError } from 'axios'

interface ErrorResponse {
  message: string // Ajusta según la estructura del backend
}

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') || '',
    token: getTokenFromLocalStorage(),
    returnUrl: null || '',
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    async login(email: string, clave: string) {
      try {
        const response = await http.post('auth/login', { email, clave })

        this.user = response.data.user || ''
        this.token = response.data.access_token

        localStorage.setItem('user', this.user || '')
        localStorage.setItem('token', this.token || '')

        router.push(this.returnUrl || '/')
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Error al iniciar sesión'
        console.error('Error al iniciar sesión:', errorMessage)
        throw new Error(errorMessage)
      }
    },
    logout() {
      localStorage.clear()
      this.$reset()
      router.push('/login')
    },
  },
})

export { useAuthStore }
