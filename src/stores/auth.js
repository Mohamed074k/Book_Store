// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
  }),

  actions: {
    login() {
      this.loading = true
      // Simulate login (in real app: POST /admin/login)
      setTimeout(() => {
        this.isAuthenticated = true
        this.token = 'mock-admin-token'
        this.loading = false
      }, 800)
    },

    logout() {
      this.isAuthenticated = false
      this.token = null
    }
  }
})