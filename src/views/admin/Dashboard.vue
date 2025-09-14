<!-- src/views/admin/Dashboard.vue -->
<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div class="bg-blue-500 text-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-semibold">Total Books</h2>
        <p class="text-4xl font-bold">{{ booksCount }}</p>
      </div>
      <div class="bg-purple-500 text-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-semibold">Total Authors</h2>
        <p class="text-4xl font-bold">{{ authorsCount }}</p>
      </div>
    </div>

    <div class="space-y-6">
      <router-link to="/admin/books" class="block bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 class="text-xl font-semibold text-gray-800">Manage Books</h3>
        <p class="text-gray-600">View, create, edit, or delete books.</p>
      </router-link>
      <router-link to="/admin/authors" class="block bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 class="text-xl font-semibold text-gray-800">Manage Authors</h3>
        <p class="text-gray-600">Add or update author profiles.</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useBooksStore } from '@/stores/books'
import { useAuthorsStore } from '@/stores/authors'
import { onMounted, computed } from 'vue'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const booksCount = computed(() => booksStore.list.length)
const authorsCount = computed(() => authorsStore.list.length)

onMounted(async () => {
  await booksStore.fetchList()
  await authorsStore.fetchList()
})
</script>