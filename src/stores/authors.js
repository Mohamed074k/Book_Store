// src/stores/authors.js
import { defineStore } from 'pinia'
import { api } from '@/services/api' // ← Use your existing API client
import { useBooksStore } from './books'

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    list: [],
    selected: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    // Get author by ID (safely converts string to number)
    authorById: (state) => (id) => {
      const numId = parseInt(id)
      return state.list.find((author) => author.id === numId)
    },

    // Filter authors by search term (name or bio)
    filteredAuthors: (state) => (query) => {
      if (!query) return state.list

      const lowerQuery = query.toLowerCase()
      return state.list.filter(
        (a) =>
          a.name.toLowerCase().includes(lowerQuery) ||
          (a.bio && a.bio.toLowerCase().includes(lowerQuery))
      )
    },

    // Get all authors who have at least one book
    authorsWithBooks: (state) => {
      const booksStore = useBooksStore()
      return state.list.filter(author =>
        booksStore.booksByAuthorId(author.id).length > 0
      )
    },

    // Count total books across all authors
    totalBooksByAuthor: (state) => {
      const booksStore = useBooksStore()
      return state.list.reduce((total, author) => {
        return total + booksStore.booksByAuthorId(author.id).length
      }, 0)
    },

    // Get recent authors (by creation date)
    recentAuthors: (state) => {
      return state.list
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
    },
  },

  actions: {
    async fetchList() {
      this.loading = true
      this.error = null

      try {
        console.log('👤 Fetching authors list...')
        const response = await api.get('/authors')
        const data = response.data

        this.list = Array.isArray(data) ? data : []
        this.lastFetchedAt = new Date()

        console.log(`✅ Successfully loaded ${this.list.length} authors`)
      } catch (err) {
        console.error('❌ Error fetching authors:', err)
        this.error = err.response?.data?.message || 'Failed to fetch authors'
        this.list = []
      } finally {
        this.loading = false
      }
    },

    async fetchById(id) {
      this.loading = true
      this.error = null

      try {
        console.log(`📖 Fetching author with ID: ${id}`)
        const response = await api.get(`/authors/${id}`)
        const data = response.data

        this.selected = data

        // Add/update in list if not present
        const existingIndex = this.list.findIndex((a) => a.id === data.id)
        if (existingIndex === -1) {
          this.list.push(data)
        } else {
          this.list[existingIndex] = data
        }

        console.log(`✅ Successfully loaded author: ${data.name}`)
      } catch (err) {
        console.error('❌ Error fetching author:', err)
        this.error = err.response?.data?.message || 'Author not found'
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    async create(authorData) {
      this.loading = true
      this.error = null

      try {
        console.log('📝 Creating new author:', authorData.name)

        // Validate required fields
        if (!authorData.name || authorData.name.trim() === '') {
          throw new Error('Author name is required')
        }
        if (authorData.name.length < 2 || authorData.name.length > 60) {
          throw new Error('Author name must be between 2 and 60 characters')
        }
        if (authorData.bio && authorData.bio.length > 800) {
          throw new Error('Bio cannot exceed 800 characters')
        }
        if (authorData.avatarUrl && !isValidUrl(authorData.avatarUrl)) {
          throw new Error('Avatar URL must be a valid URL')
        }

        // Prevent duplicate names (case-insensitive)
        const existingAuthor = this.list.find(
          (a) =>
            a.name.toLowerCase().trim() === authorData.name.toLowerCase().trim()
        )
        if (existingAuthor) {
          throw new Error(`An author named "${existingAuthor.name}" already exists`)
        }

        const response = await api.post('/authors', authorData)
        const data = response.data

        this.list.push(data)
        this.selected = data

        console.log(`✅ Successfully created author: ${data.name}`)
        return data
      } catch (err) {
        console.error('❌ Error creating author:', err)
        this.error = err.message || 'Failed to create author'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id, authorData) {
      this.loading = true
      this.error = null

      try {
        console.log(`📝 Updating author ID: ${id}`)

        // Validate required fields
        if (!authorData.name || authorData.name.trim() === '') {
          throw new Error('Author name is required')
        }
        if (authorData.name.length < 2 || authorData.name.length > 60) {
          throw new Error('Author name must be between 2 and 60 characters')
        }
        if (authorData.bio && authorData.bio.length > 800) {
          throw new Error('Bio cannot exceed 800 characters')
        }
        if (authorData.avatarUrl && !isValidUrl(authorData.avatarUrl)) {
          throw new Error('Avatar URL must be a valid URL')
        }

        // Prevent duplicate names (ignore current author)
        const existingAuthor = this.list.find(
          (a) =>
            a.name.toLowerCase().trim() === authorData.name.toLowerCase().trim() &&
            a.id !== parseInt(id)
        )
        if (existingAuthor) {
          throw new Error(`An author named "${existingAuthor.name}" already exists`)
        }

        const response = await api.put(`/authors/${id}`, authorData)
        const data = response.data

        const index = this.list.findIndex((a) => a.id === parseInt(id))
        if (index !== -1) {
          this.list[index] = data
        }
        this.selected = data

        console.log(`✅ Successfully updated author: ${data.name}`)
        return data
      } catch (err) {
        console.error('❌ Error updating author:', err)
        this.error = err.message || 'Failed to update author'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      this.error = null

      try {
        console.log(`🗑️ Deleting author ID: ${id}`)

        await api.delete(`/authors/${id}`)

        this.list = this.list.filter((a) => a.id !== parseInt(id))
        if (this.selected?.id === parseInt(id)) {
          this.selected = null
        }

        console.log(`✅ Successfully deleted author`)
      } catch (err) {
        console.error('❌ Error deleting author:', err)
        this.error = err.response?.data?.message || 'Failed to delete author'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Clear any active error
    clearError() {
      this.error = null
    },

    // Reset entire store state (useful for logout or testing)
    reset() {
      this.list = []
      this.selected = null
      this.loading = false
      this.error = null
      this.lastFetchedAt = null
    },
  },
})

// Helper: Validate URL format
function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}