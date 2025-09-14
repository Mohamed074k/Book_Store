// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
    lastFetchedAt: null, // For consistency with other stores
  }),

  getters: {
    // Check if user is authenticated and token is valid
    isValidToken: (state) => {
      return !!state.token && state.isAuthenticated
    },

    // Return user info (for future expansion)
    userInfo: (state) => {
      return state.isAuthenticated ? { token: state.token, loggedinAt: state.lastFetchedAt } : null
    },
  },

  actions: {
    // Simulate login with API call
    async login(credentials = {}) {
      this.loading = true
      this.error = null

      try {
        console.log('🔐 Attempting login...')

        // In real app: POST to /admin/login with credentials
        // const response = await api.post('/admin/login', credentials)
        // const token = response.data.token

        // SIMULATED LOGIN — mock success after delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock token (in real app, this comes from backend)
        const mockToken = 'mock-admin-token-' + Date.now()
        this.token = mockToken
        this.isAuthenticated = true
        this.lastFetchedAt = new Date()

        // Persist token to localStorage for persistence across refreshes
        localStorage.setItem('adminToken', mockToken)

        console.log('✅ Login successful')
      } catch (err) {
        console.error('❌ Login failed:', err)
        this.error = err.message || 'Login failed. Please try again.'
        this.isAuthenticated = false
        this.token = null
        throw err
      } finally {
        this.loading = false
      }
    },

    // Logout and clear state
    logout() {
      console.log('🚪 Logging out...')

      this.isAuthenticated = false
      this.token = null
      this.lastFetchedAt = null
      this.error = null

      // Clear token from localStorage
      localStorage.removeItem('adminToken')

      console.log('✅ Logged out successfully')
    },

    // Try to auto-login from localStorage on app load
    async hydrateFromStorage() {
      this.loading = true
      this.error = null

      try {
        console.log('🔄 Hydrating auth state from localStorage...')

        const storedToken = localStorage.getItem('adminToken')
        if (storedToken) {
          this.token = storedToken
          this.isAuthenticated = true
          this.lastFetchedAt = new Date()
          console.log('✅ Auth state restored from storage')
        } else {
          console.log('ℹ️ No auth token found in storage')
        }
      } catch (err) {
        console.error('❌ Failed to hydrate auth state:', err)
        this.error = 'Failed to restore session'
      } finally {
        this.loading = false
      }
    },

    // Clear any active error
    clearError() {
      this.error = null
    },

    // Reset entire store (useful for testing or forced logout)
    reset() {
      this.isAuthenticated = false
      this.token = null
      this.loading = false
      this.error = null
      this.lastFetchedAt = null
      localStorage.removeItem('adminToken')
    },
  },
})