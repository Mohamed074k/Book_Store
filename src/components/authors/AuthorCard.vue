<!-- src/components/authors/AuthorCard.vue -->
<template>
  <router-link
    :to="{ name: 'AuthorDetail', params: { id: author.id } }"
    class="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
  >
    <div class="aspect-square bg-gray-100 relative">
      <img
        :src="author.avatarUrl"
        :alt="author.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>

    <div class="p-5">
      <h3 class="font-bold text-gray-800 mb-2 line-clamp-2">{{ author.name }}</h3>
      <p class="text-sm text-gray-600 line-clamp-3">{{ author.bio }}</p>
      
      <div class="mt-4 pt-4 border-t border-gray-100">
        <span class="text-xs text-gray-500">
          {{ booksCount }} book{{ booksCount !== 1 ? 's' : '' }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { useBooksStore } from '@/stores/books'

const props = defineProps({
  author: {
    type: Object,
    required: true
  }
})

const booksStore = useBooksStore()

// Compute number of books by this author
const booksCount = computed(() => {
  return booksStore.booksByAuthorId(props.author.id).length
})
</script>