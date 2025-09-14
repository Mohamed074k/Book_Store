<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4 animate-fade-in-up">
            Discover Your Next Great Read
          </h1>
          <p class="text-xl opacity-90 mb-8 animate-fade-in-up animation-delay-200">
            Explore our curated collection of amazing books from talented authors
          </p>

          <!-- Search & Filter -->
          <div class="max-w-2xl mx-auto">
            <!-- Search -->
            <div class="relative mb-4 animate-fade-in-up animation-delay-300">
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Search books by title..."
                class="w-full px-6 py-4 rounded-2xl text-gray-800 placeholder-gray-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform focus:scale-105"
              />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Author Filter -->
            <div class="animate-fade-in-up animation-delay-400">
              <select
                v-model="selectedAuthorId"
                @change="handleSearch"
                class="w-full px-6 py-3 rounded-xl text-gray-800 bg-white/90 backdrop-blur shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
              >
                <option value="">All Authors</option>
                <option
                  v-for="author in authors.list"
                  :key="author.id"
                  :value="author.id"
                >
                  {{ author.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Books Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div
          v-if="books.loading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <div
            v-for="n in 8"
            :key="n"
            class="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
          >
            <div class="h-64 bg-gray-200"></div>
            <div class="p-6 space-y-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              <div class="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="books.error" class="text-center py-16">
          <div
            class="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto animate-fade-in-up"
          >
            <div class="text-red-600 mb-4">
              <svg
                class="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p class="text-gray-600 mb-6">{{ books.error }}</p>
            <button
              @click="loadBooks"
              class="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Books Grid -->
        <div
          v-else-if="filteredBooks.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <div
            v-for="(book, index) in filteredBooks"
            :key="book.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
            @click="goToBook(book.id)"
          >
            <!-- Book Cover -->
            <div class="relative overflow-hidden rounded-t-2xl">
              <img
                :src="book.coverUrl"
                :alt="book.title"
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                @error="handleImageError"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-sm font-medium">Click to view details</p>
                </div>
              </div>
              <!-- Year Badge -->
              <div
                class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ book.year }}
              </div>
            </div>

            <!-- Book Details -->
            <div class="p-6">
              <h3
                class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300"
              >
                {{ book.title }}
              </h3>
              <p class="text-blue-600 font-medium mb-3">
                by {{ getAuthorName(book.authorId) }}
              </p>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ book.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in book.tags"
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Action Button -->
              <button
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 animate-fade-in-up">
          <div class="max-w-md mx-auto">
            <div class="text-gray-400 mb-6">
              <svg
                class="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">
              No books found
            </h3>
            <p class="text-gray-600 mb-6">
              {{
                searchQuery || selectedAuthorId
                  ? "Try adjusting your search criteria"
                  : "No books available yet"
              }}
            </p>
            <button
              v-if="searchQuery || selectedAuthorId"
              @click="clearFilters"
              class="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useBooksStore } from "@/stores/books"
import { useAuthorsStore } from "@/stores/authors"

const router = useRouter()
const books = useBooksStore()
const authors = useAuthorsStore()

const searchQuery = ref("")
const selectedAuthorId = ref("")

const filteredBooks = computed(() => {
  return books.filteredBooks(searchQuery.value, selectedAuthorId.value || null)
})

const getAuthorName = (authorId) => {
  const author = authors.authorById(authorId)
  return author ? author.name : "Unknown Author"
}

const goToBook = (id) => {
  router.push({ name: "BookDetail", params: { id: id.toString() } })
}

const handleSearch = () => {}

const clearFilters = () => {
  searchQuery.value = ""
  selectedAuthorId.value = ""
}

const handleImageError = (event) => {
  event.target.src =
    "https://via.placeholder.com/300x400/e5e7eb/9ca3af?text=No+Image"
}

const loadBooks = async () => {
  await Promise.all([books.fetchList(), authors.fetchList()])
}

onMounted(loadBooks)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
