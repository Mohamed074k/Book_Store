// src/stores/authors.js
import { defineStore } from 'pinia'
import { authorsAPI } from '@/services/api' // ← FIXED: Use authorsAPI instead of raw api
import { useBooksStore } from './books'
import { normalizeId, ensureNumericId } from '@/utils/idHelpers' 

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    list: [],
    selected: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    // Get author by ID (safely converts string to number and handles both types)
    authorById: (state) => (id) => {
      // Handle both string and number IDs
      const searchId = typeof id === 'string' ? parseInt(id) : id
      return state.list.find((author) => {
        const authorId = typeof author.id === 'string' ? parseInt(author.id) : author.id
        return authorId === searchId
      })
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
      return state.list.filter(author => {
        const authorId = typeof author.id === 'string' ? parseInt(author.id) : author.id
        return booksStore.booksByAuthorId(authorId).length > 0
      })
    },

    // Count total books across all authors
    totalBooksByAuthor: (state) => {
      const booksStore = useBooksStore()
      return state.list.reduce((total, author) => {
        const authorId = typeof author.id === 'string' ? parseInt(author.id) : author.id
        return total + booksStore.booksByAuthorId(authorId).length
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
        const data = await authorsAPI.getAll()

        // Use the helper function to normalize IDs
        this.list = ensureNumericId(data) || []
        
        this.lastFetchedAt = new Date()
        console.log(`✅ Successfully loaded ${this.list.length} authors`)
      } catch (err) {
        console.error('❌ Error fetching authors:', err)
        this.error = err.message || 'Failed to fetch authors'
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
        const data = await authorsAPI.getById(id)

        // Use the helper function to normalize IDs
        const normalizedData = ensureNumericId(data)

        this.selected = normalizedData

        // Add/update in list if not present
        const normalizedId = normalizeId(normalizedData.id)
        const existingIndex = this.list.findIndex(author => 
          normalizeId(author.id) === normalizedId
        )
        
        if (existingIndex === -1) {
          this.list.push(normalizedData)
        } else {
          this.list[existingIndex] = normalizedData
        }

        console.log(`✅ Successfully loaded author: ${normalizedData.name}`)
      } catch (err) {
        console.error('❌ Error fetching author:', err)
        this.error = err.message || 'Author not found'
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

        const data = await authorsAPI.create(authorData) // ← FIXED: Use authorsAPI

        // Normalize ID to number
        const normalizedData = {
          ...data,
          id: typeof data.id === 'string' ? parseInt(data.id) : data.id
        }

        this.list.push(normalizedData)
        this.selected = normalizedData

        console.log(`✅ Successfully created author: ${normalizedData.name}`)
        return normalizedData
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

        const searchId = typeof id === 'string' ? parseInt(id) : id

        // Prevent duplicate names (ignore current author)
        const existingAuthor = this.list.find(
          (a) => {
            const authorId = typeof a.id === 'string' ? parseInt(a.id) : a.id
            return a.name.toLowerCase().trim() === authorData.name.toLowerCase().trim() &&
                   authorId !== searchId
          }
        )
        if (existingAuthor) {
          throw new Error(`An author named "${existingAuthor.name}" already exists`)
        }

        const data = await authorsAPI.update(id, authorData) // ← FIXED: Use authorsAPI

        // Normalize ID to number
        const normalizedData = {
          ...data,
          id: typeof data.id === 'string' ? parseInt(data.id) : data.id
        }

        const index = this.list.findIndex((a) => {
          const authorId = typeof a.id === 'string' ? parseInt(a.id) : a.id
          return authorId === searchId
        })
        
        if (index !== -1) {
          this.list[index] = normalizedData
        }
        this.selected = normalizedData

        console.log(`✅ Successfully updated author: ${normalizedData.name}`)
        return normalizedData
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

        await authorsAPI.delete(id) // ← FIXED: Use authorsAPI

        const searchId = typeof id === 'string' ? parseInt(id) : id
        
        this.list = this.list.filter((a) => {
          const authorId = typeof a.id === 'string' ? parseInt(a.id) : a.id
          return authorId !== searchId
        })
        
        if (this.selected) {
          const selectedId = typeof this.selected.id === 'string' ? parseInt(this.selected.id) : this.selected.id
          if (selectedId === searchId) {
            this.selected = null
          }
        }

        console.log(`✅ Successfully deleted author`)
      } catch (err) {
        console.error('❌ Error deleting author:', err)
        this.error = err.message || 'Failed to delete author'
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
