// src/stores/books.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { useAuthorsStore } from './authors'

export const useBooksStore = defineStore('books', {
  state: () => ({
    list: [],
    selected: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    bookById: (state) => (id) =>
      state.list.find((book) => book.id === id),

    booksByAuthorId: (state) => (authorId) =>
      state.list.filter((b) => b.authorId === authorId),

    filteredBooks: (state) => (titleQuery, authorId) => {
      let filtered = state.list
      if (titleQuery)
        filtered = filtered.filter((b) =>
          b.title.toLowerCase().includes(titleQuery.toLowerCase())
        )
      if (authorId !== null)
        filtered = filtered.filter((b) => b.authorId === authorId)
      return filtered
    },

    duplicateTitleExists: (state) => (title, authorId, currentBookId) => {
      return state.list.some(
        (b) =>
          b.title.toLowerCase() === title.toLowerCase() &&
          b.authorId === authorId &&
          b.id !== currentBookId
      )
    },
  },

  actions: {
    async fetchList() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/books')
        this.list = response.data
        this.lastFetchedAt = new Date()
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch books'
      } finally {
        this.loading = false
      }
    },

    async fetchById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get(`/books/${id}`)
        this.selected = response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Book not found'
      } finally {
        this.loading = false
      }
    },

    async create(bookData) {
      this.loading = true
      this.error = null

      // Validate author exists
      const authorsStore = useAuthorsStore()
      if (!authorsStore.authorById(bookData.authorId)) {
        this.error = 'Selected author does not exist'
        throw new Error('Invalid authorId')
      }

      try {
        const response = await api.post('/books', bookData)
        this.list.push(response.data)
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to create book'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id, bookData) {
      this.loading = true
      this.error = null

      // Validate author exists
      const authorsStore = useAuthorsStore()
      if (!authorsStore.authorById(bookData.authorId)) {
        this.error = 'Selected author does not exist'
        throw new Error('Invalid authorId')
      }

      try {
        const response = await api.put(`/books/${id}`, bookData)
        const index = this.list.findIndex((b) => b.id === id)
        if (index !== -1) this.list[index] = response.data
        this.selected = response.data
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update book'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/books/${id}`)
        this.list = this.list.filter((b) => b.id !== id)
        if (this.selected?.id === id) this.selected = null
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to delete book'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})