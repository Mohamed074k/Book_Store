// src/stores/authors.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    list: [],
    selected: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    authorById: (state) => (id) =>
      state.list.find((author) => author.id === id),

    filteredAuthors: (state) => (query) => {
      if (!query) return state.list
      return state.list.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.bio.toLowerCase().includes(query.toLowerCase())
      )
    },
  },

  actions: {
    async fetchList(query = '') {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/authors', { params: query ? { q: query } : {} })
        this.list = response.data
        this.lastFetchedAt = new Date()
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch authors'
      } finally {
        this.loading = false
      }
    },

    async fetchById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get(`/authors/${id}`)
        this.selected = response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Author not found'
      } finally {
        this.loading = false
      }
    },

    async create(authorData) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/authors', authorData)
        this.list.push(response.data)
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to create author'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id, authorData) {
      this.loading = true
      this.error = null
      try {
        const response = await api.put(`/authors/${id}`, authorData)
        const index = this.list.findIndex((a) => a.id === id)
        if (index !== -1) this.list[index] = response.data
        this.selected = response.data
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update author'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/authors/${id}`)
        this.list = this.list.filter((a) => a.id !== id)
        if (this.selected?.id === id) this.selected = null
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to delete author'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})