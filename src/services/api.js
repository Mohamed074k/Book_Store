// src/services/api.js
import axios from 'axios'

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error)
    
    // Handle different error scenarios
    if (error.code === 'ECONNABORTED') {
      console.error('🔥 Request timeout - is JSON server running?')
      error.message = 'Request timeout. Please check if the server is running.'
    } else if (error.code === 'ERR_NETWORK') {
      console.error('🔥 Network error - is JSON server running on port 3000?')
      error.message = 'Cannot connect to server. Please start JSON server with: npx json-server --watch db.json --port 3000'
    } else if (error.response?.status === 404) {
      error.message = 'Resource not found'
    } else if (error.response?.status >= 500) {
      error.message = 'Server error. Please try again later.'
    }
    
    return Promise.reject(error)
  }
)

// API methods for books
export const booksAPI = {
  // Get all books
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/books', { params })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch books: ${error.message}`)
    }
  },

  // Get book by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch book: ${error.message}`)
    }
  },

  // Create new book
  create: async (bookData) => {
    try {
      const response = await api.post('/books', {
        ...bookData,
        id: Date.now(), // Generate ID for json-server
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`)
    }
  },

  // Update book
  update: async (id, bookData) => {
    try {
      const response = await api.put(`/books/${id}`, {
        ...bookData,
        id: parseInt(id),
        updatedAt: new Date().toISOString(),
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to update book: ${error.message}`)
    }
  },

  // Delete book
  delete: async (id) => {
    try {
      await api.delete(`/books/${id}`)
      return true
    } catch (error) {
      throw new Error(`Failed to delete book: ${error.message}`)
    }
  },
}

// API methods for authors
export const authorsAPI = {
  // Get all authors
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/authors', { params })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch authors: ${error.message}`)
    }
  },

  // Get author by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/authors/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch author: ${error.message}`)
    }
  },

  // Create new author
  create: async (authorData) => {
    try {
      const response = await api.post('/authors', {
        ...authorData,
        id: Date.now(), // Generate ID for json-server
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to create author: ${error.message}`)
    }
  },

  // Update author
  update: async (id, authorData) => {
    try {
      const response = await api.put(`/authors/${id}`, {
        ...authorData,
        id: parseInt(id),
        updatedAt: new Date().toISOString(),
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to update author: ${error.message}`)
    }
  },

  // Delete author
  delete: async (id) => {
    try {
      await api.delete(`/authors/${id}`)
      return true
    } catch (error) {
      throw new Error(`Failed to delete author: ${error.message}`)
    }
  },
}

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/books', { timeout: 3000 })
    return {
      status: 'healthy',
      message: 'Server is running',
      data: response.data
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: error.message,
      error: error.code
    }
  }
}

// Export the main api instance for direct use
export { api }
export default api