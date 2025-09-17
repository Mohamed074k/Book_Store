 import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('admin_token') || null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const userInfo = computed(() => user.value)

  // Actions
  const login = async (credentials = {}) => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in real app, this would be an API call
      const mockUser = {
        id: 1,
        username: credentials.username || 'admin',
        email: 'admin@library.com',
        role: 'admin',
        name: 'Library Administrator',
        avatar: 'https://via.placeholder.com/64x64/6366f1/ffffff?text=A',
        permissions: ['books:read', 'books:write', 'authors:read', 'authors:write'],
        loginAt: new Date().toISOString()
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      // Set user data
      user.value = mockUser
      token.value = mockToken
      
      // Store token in localStorage
      localStorage.setItem('admin_token', mockToken)
      localStorage.setItem('admin_user', JSON.stringify(mockUser))
      
      return { user: mockUser, token: mockToken }
    } catch (err) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Clear user data
      user.value = null
      token.value = null
      
      // Clear localStorage
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      
    } catch (err) {
      error.value = err.message || 'Logout failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    const storedToken = localStorage.getItem('admin_token')
    const storedUser = localStorage.getItem('admin_user')
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        return true
      } catch (err) {
        // Clear invalid stored data
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
        return false
      }
    }
    return false
  }

  const refreshToken = async () => {
    if (!token.value) return false
    
    try {
      loading.value = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
 
      const newToken = 'refreshed-token-' + Date.now()
      token.value = newToken
      localStorage.setItem('admin_token', newToken)
      
      return true
    } catch (err) {
      error.value = err.message || 'Token refresh failed'
      await logout()
      return false
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (profileData) => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Update user data
      user.value = { ...user.value, ...profileData }
      localStorage.setItem('admin_user', JSON.stringify(user.value))
      
      return user.value
    } catch (err) {
      error.value = err.message || 'Profile update failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock password validation
      if (currentPassword !== 'admin') {
        throw new Error('Current password is incorrect')
      }
      
      if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long')
      }
      
       return true
    } catch (err) {
      error.value = err.message || 'Password change failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const hasPermission = (permission) => {
    if (!user.value || !user.value.permissions) return false
    return user.value.permissions.includes(permission) || user.value.role === 'admin'
  }

  const getSessionInfo = () => {
    return {
      isAuthenticated: isAuthenticated.value,
      user: user.value,
      loginTime: user.value?.loginAt,
      sessionDuration: user.value?.loginAt ? 
        Math.floor((Date.now() - new Date(user.value.loginAt).getTime()) / 1000) : 0
    }
  }

  // Initialize auth state on store creation
  const initializeAuth = async () => {
    await checkAuth()
  }

  // Clear any errors
  const clearError = () => {
    error.value = null
  }

  // Auto-refresh token periodically (every 15 minutes)
  const startTokenRefresh = () => {
    setInterval(async () => {
      if (isAuthenticated.value) {
        await refreshToken()
      }
    }, 15 * 60 * 1000) // 15 minutes
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    isAdmin,
    userInfo,
    
    // Actions
    login,
    logout,
    checkAuth,
    refreshToken,
    updateProfile,
    changePassword,
    hasPermission,
    getSessionInfo,
    initializeAuth,
    clearError,
    startTokenRefresh
  }
})