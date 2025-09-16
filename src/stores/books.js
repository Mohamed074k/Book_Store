// src/stores/books.js
import { defineStore } from 'pinia'
import { booksAPI } from '@/services/api'

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
      const numId = parseInt(id)
      return state.list.find((book) => book.id === numId)
    },

    booksByAuthorId: (state) => (authorId) => {
      const numAuthorId = parseInt(authorId)
      return state.list.filter((b) => b.authorId === numAuthorId)
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
      const numAuthorId = parseInt(authorId)
      const numCurrentBookId = currentBookId ? parseInt(currentBookId) : null
      
      return state.list.some(
        (b) =>
          b.title.toLowerCase() === title.toLowerCase() &&
          b.authorId === numAuthorId &&
          b.id !== numCurrentBookId
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
        
        this.list = Array.isArray(data) ? data : []
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
        
        this.selected = data
        
        // Also add to list if not already there
        const existingIndex = this.list.findIndex(book => book.id === data.id)
        if (existingIndex === -1) {
          this.list.push(data)
        } else {
          this.list[existingIndex] = data
        }
        
        console.log(`✅ Successfully loaded book: ${data.title}`)
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
        
        this.list.push(data)
        this.selected = data
        
        console.log(`✅ Successfully created book: ${data.title}`)
        return data
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
        
        const index = this.list.findIndex((b) => b.id === parseInt(id))
        if (index !== -1) {
          this.list[index] = dat  a
        }
        this.selected = data
        
        console.log(`✅ Successfully updated book: ${data.title}`)
        return data
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
        
        this.list = this.list.filter((b) => b.id !== parseInt(id))
        if (this.selected?.id === parseInt(id)) {
          this.selected = null
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