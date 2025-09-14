<!-- src/components/books/BookCard.vue -->
<template>
  <router-link
    :to="{ name: 'BookDetail', params: { id: book.id } }"
    class="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
  >
    <div class="aspect-[3/4] bg-gray-100 relative">
      <img
        :src="book.coverUrl"
        :alt="book.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>

    <div class="p-5">
      <h3 class="font-bold text-gray-800 mb-2 line-clamp-2">{{ book.title }}</h3>
      <p class="text-sm text-gray-600 mb-3">
        <span class="font-medium">Author:</span>
        {{ getAuthorName(book.authorId) }}
      </p>
      <p class="text-sm text-gray-500 mb-3">
        <span class="font-medium">Year:</span> {{ book.year }}
      </p>
      <div class="flex flex-wrap gap-1 mb-4">
        <span
          v-for="tag in book.tags"
          :key="tag"
          class="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
      <p class="text-sm text-gray-600 line-clamp-3">{{ book.description }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { useAuthorsStore } from '@/stores/authors'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const authorsStore = useAuthorsStore()

function getAuthorName(authorId) {
  const author = authorsStore.authorById(authorId)
  return author ? author.name : 'Unknown Author'
}
</script>