// src/services/api.js
import axios from 'axios'

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: 'http://localhost:3000', 
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
      // Ensure IDs are numbers
      return Array.isArray(response.data) 
        ? response.data.map(book => ({
            ...book,
            id: typeof book.id === 'string' ? parseInt(book.id) : book.id,
            authorId: typeof book.authorId === 'string' ? parseInt(book.authorId) : book.authorId
          }))
        : response.data
    } catch (error) {
      throw new Error(`Failed to fetch books: ${error.message}`)
    }
  },

  // Get book by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`)
      const data = response.data
      // Ensure IDs are numbers
      return {
        ...data,
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id,
        authorId: typeof data.authorId === 'string' ? parseInt(data.authorId) : data.authorId
      }
    } catch (error) {
      throw new Error(`Failed to fetch book: ${error.message}`)
    }
  },

  // Create new book - ensure numeric ID
  create: async (bookData) => {
    try {
      // Generate a proper numeric ID
      const newId = Math.floor(Date.now() / 1000) // Use timestamp-based ID
      
      const response = await api.post('/books', {
        ...bookData,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      
      // Ensure response IDs are numbers
      const data = response.data
      return {
        ...data,
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id,
        authorId: typeof data.authorId === 'string' ? parseInt(data.authorId) : data.authorId
      }
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`)
    }
  },

  // Update book - ensure numeric ID
  update: async (id, bookData) => {
    try {
      const numericId = typeof id === 'string' ? parseInt(id) : id
      const response = await api.put(`/books/${id}`, {
        ...bookData,
        id: numericId,
        updatedAt: new Date().toISOString(),
      })
      
      // Ensure response IDs are numbers
      const data = response.data
      return {
        ...data,
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id,
        authorId: typeof data.authorId === 'string' ? parseInt(data.authorId) : data.authorId
      }
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
      // Ensure IDs are numbers
      return Array.isArray(response.data) 
        ? response.data.map(author => ({
            ...author,
            id: typeof author.id === 'string' ? parseInt(author.id) : author.id
          }))
        : response.data
    } catch (error) {
      throw new Error(`Failed to fetch authors: ${error.message}`)
    }
  },

  // Get author by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/authors/${id}`)
      const data = response.data
      // Ensure IDs are numbers
      return {
        ...data,
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id
      }
    } catch (error) {
      throw new Error(`Failed to fetch author: ${error.message}`)
    }
  },

  // Create new author - ensure numeric ID
  create: async (authorData) => {
    try {
      // Generate a proper numeric ID
      const newId = Math.floor(Date.now() / 1000) // Use timestamp-based ID
      
      const response = await api.post('/authors', {
        ...authorData,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      
      // Ensure response IDs are numbers
      const data = response.data
      return {
        ...data,
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id
      }
    } catch (error) {
      throw new Error(`Failed to create author: ${error.message}`)
    }
  },

  // Update author - ensure numeric ID
  update: async (id, authorData) => {
    try {
      const numericId = typeof id === 'string' ? parseInt(id) : id
      const response = await api.put(`/authors/${id}`, {
        ...authorData,
        id: numericId,
        updatedAt: new Date().toISOString(),
      })
      
      // Ensure response IDs are numbers
      const data = response.data
      return {
        ...data,
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id
      }
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
