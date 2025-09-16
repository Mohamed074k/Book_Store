// src/stores/books.js
import { defineStore } from 'pinia'
import { booksAPI } from '@/services/api'
import { normalizeId, ensureNumericId } from '@/utils/idHelpers'

export const useBooksStore = defineStore('books', {
  state: () => ({
    list: [],
    selected: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    bookById: (state) => (id) => {
      // Handle both string and number IDs
      const searchId = typeof id === 'string' ? parseInt(id) : id
      return state.list.find((book) => {
        const bookId = typeof book.id === 'string' ? parseInt(book.id) : book.id
        return bookId === searchId
      })
    },

    booksByAuthorId: (state) => (authorId) => {
      // Handle both string and number IDs
      const searchAuthorId = typeof authorId === 'string' ? parseInt(authorId) : authorId
      return state.list.filter((b) => {
        const bookAuthorId = typeof b.authorId === 'string' ? parseInt(b.authorId) : b.authorId
        return bookAuthorId === searchAuthorId
      })
    },

    filteredBooks: (state) => (titleQuery, authorId) => {
      let filtered = state.list
      
      if (titleQuery) {
        const query = titleQuery.toLowerCase()
        filtered = filtered.filter((b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query)
        )
      }
      
      if (authorId !== null && authorId !== '') {
        const numAuthorId = parseInt(authorId)
        filtered = filtered.filter((b) => b.authorId === numAuthorId)
      }
      
      return filtered
    },

    duplicateTitleExists: (state) => (title, authorId, currentBookId) => {
      const searchAuthorId = typeof authorId === 'string' ? parseInt(authorId) : authorId
      const searchCurrentBookId = currentBookId ? (typeof currentBookId === 'string' ? parseInt(currentBookId) : currentBookId) : null
      
      return state.list.some(
        (b) => {
          const bookAuthorId = typeof b.authorId === 'string' ? parseInt(b.authorId) : b.authorId
          const bookId = typeof b.id === 'string' ? parseInt(b.id) : b.id
          return b.title.toLowerCase() === title.toLowerCase() &&
                 bookAuthorId === searchAuthorId &&
                 bookId !== searchCurrentBookId
        }
      )
    },

    recentBooks: (state) => {
      return state.list
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
    },

    booksByGenre: (state) => (genre) => {
      return state.list.filter(book => 
        book.tags && book.tags.includes(genre.toLowerCase())
      )
    },
  },
 
    actions: {
    async fetchList() {
      this.loading = true
      this.error = null
      
      try {
        console.log('📚 Fetching books list...')
        const data = await booksAPI.getAll()
        
        // Use the helper function to normalize IDs
        this.list = ensureNumericId(data) || []
        
        this.lastFetchedAt = new Date()
        console.log(`✅ Successfully loaded ${this.list.length} books`)
      } catch (err) {
        console.error('❌ Error fetching books:', err)
        this.error = err.message || 'Failed to fetch books'
        this.list = []
      } finally {
        this.loading = false
      }
    },

    async fetchById(id) {
      this.loading = true
      this.error = null
      
      try {
        console.log(`📖 Fetching book with ID: ${id}`)
        const data = await booksAPI.getById(id)
        
        // Use the helper function to normalize IDs
        const normalizedData = ensureNumericId(data)
        
        this.selected = normalizedData
        
        // Also add to list if not already there
        const normalizedId = normalizeId(normalizedData.id)
        const existingIndex = this.list.findIndex(book => 
          normalizeId(book.id) === normalizedId
        )
        
        if (existingIndex === -1) {
          this.list.push(normalizedData)
        } else {
          this.list[existingIndex] = normalizedData
        }
        
        console.log(`✅ Successfully loaded book: ${normalizedData.title}`)
      } catch (err) {
        console.error('❌ Error fetching book:', err)
        this.error = err.message || 'Book not found'
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    async create(bookData) {
      this.loading = true
      this.error = null
      
      try {
        console.log('📝 Creating new book:', bookData.title)
        
        // Basic validation
        if (!bookData.title || !bookData.title.trim()) {
          throw new Error('Book title is required')
        }
        
        if (!bookData.authorId) {
          throw new Error('Author selection is required')
        }
        
        if (!bookData.description || !bookData.description.trim()) {
          throw new Error('Book description is required')
        }

        const data = await booksAPI.create(bookData)
        
        // Normalize IDs to numbers
        const normalizedData = {
          ...data,
          id: typeof data.id === 'string' ? parseInt(data.id) : data.id,
          authorId: typeof data.authorId === 'string' ? parseInt(data.authorId) : data.authorId
        }
        
        this.list.push(normalizedData)
        this.selected = normalizedData
        
        console.log(`✅ Successfully created book: ${normalizedData.title}`)
        return normalizedData
      } catch (err) {
        console.error('❌ Error creating book:', err)
        this.error = err.message || 'Failed to create book'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id, bookData) {
      this.loading = true
      this.error = null
      
      try {
        console.log(`📝 Updating book ID: ${id}`)
        
        // Basic validation
        if (!bookData.title || !bookData.title.trim()) {
          throw new Error('Book title is required')
        }
        
        if (!bookData.authorId) {
          throw new Error('Author selection is required')
        }
        
        if (!bookData.description || !bookData.description.trim()) {
          throw new Error('Book description is required')
        }

        const data = await booksAPI.update(id, bookData)
        
        // Normalize IDs to numbers
        const normalizedData = {
          ...data,
          id: typeof data.id === 'string' ? parseInt(data.id) : data.id,
          authorId: typeof data.authorId === 'string' ? parseInt(data.authorId) : data.authorId
        }
        
        const searchId = typeof id === 'string' ? parseInt(id) : id
        const index = this.list.findIndex((b) => {
          const bookId = typeof b.id === 'string' ? parseInt(b.id) : b.id
          return bookId === searchId
        })
        
        if (index !== -1) {
          this.list[index] = normalizedData
        }
        this.selected = normalizedData
        
        console.log(`✅ Successfully updated book: ${normalizedData.title}`)
        return normalizedData
      } catch (err) {
        console.error('❌ Error updating book:', err)
        this.error = err.message || 'Failed to update book'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      this.error = null
      
      try {
        console.log(`🗑️ Deleting book ID: ${id}`)
        
        await booksAPI.delete(id)
        
        const searchId = typeof id === 'string' ? parseInt(id) : id
        
        this.list = this.list.filter((b) => {
          const bookId = typeof b.id === 'string' ? parseInt(b.id) : b.id
          return bookId !== searchId
        })
        
        if (this.selected) {
          const selectedId = typeof this.selected.id === 'string' ? parseInt(this.selected.id) : this.selected.id
          if (selectedId === searchId) {
            this.selected = null
          }
        }
        
        console.log(`✅ Successfully deleted book`)
      } catch (err) {
        console.error('❌ Error deleting book:', err)
        this.error = err.message || 'Failed to delete book'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Clear error state
    clearError() {
      this.error = null
    },

    // Reset store state
    reset() {
      this.list = []
      this.selected = null
      this.loading = false
      this.error = null
      this.lastFetchedAt = null
    },
  }
})
