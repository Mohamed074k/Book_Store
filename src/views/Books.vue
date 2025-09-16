<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <!-- Hero Section -->
    <section class="bg-gradient-hero text-white py-16 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="floating-element absolute top-20 left-10 text-3xl">📚</div>
        <div class="floating-element absolute top-40 right-20 text-3xl">📖</div>
        <div class="floating-element absolute bottom-32 left-1/4 text-3xl">📕</div>
        <div class="floating-element absolute bottom-20 right-1/3 text-3xl">📘</div>
      </div>
      
      <div class="container mx-auto px-4 relative">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4 animate-fade-in-up">
            Discover Your Next Great Read
          </h1>
          <p class="text-xl opacity-90 mb-8 animate-fade-in-up animation-delay-200">
            Explore our curated collection of amazing books from talented authors
          </p>
</div>
</div>
 <!-- Enhanced Search & Filter -->
          <div class="max-w-2xl mx-4 md:mx-auto">
            <div class="grid md:grid-cols-1 gap-6">
              <!-- Search Input -->
              <div class="relative animate-fade-in-up animation-delay-300">
                <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  @input="handleSearch"
                  type="text"
                  placeholder="Search books by title..."
                  class="w-full pl-14 pr-6 py-4 rounded-2xl text-gray-800 placeholder-purple-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition-all duration-300 transform focus:scale-105 bg-white/95 backdrop-blur-sm border border-white/50 hover:border-white/70"
                />
                <!-- Clear Search Button -->
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''; handleSearch()"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-400 hover:text-purple-600 transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <!-- Author Filter Dropdown -->
              <div class="relative animate-fade-in-up animation-delay-400">
                <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <select
                  v-model="selectedAuthorId"
                  @change="handleSearch"
                  class="w-full pl-14 pr-12 py-4 rounded-2xl text-gray-800 bg-white/95 backdrop-blur-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition-all duration-300 border border-white/50 hover:border-white/70 appearance-none cursor-pointer"
                >
                  <option value="" class="text-gray-600">All Authors</option>
                  <option
                    v-for="author in authors.list"
                    :key="author.id"
                    :value="author.id"
                    class="text-gray-800"
                  >
                    {{ author.name }}
                  </option>
                </select>
                <!-- Dropdown Arrow -->
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Filter Summary -->
            <div v-if="searchQuery || selectedAuthorId" class="mt-4 animate-fade-in-up animation-delay-500">
              <div class="flex flex-wrap justify-center gap-3">
                <div v-if="searchQuery" class="glass-effect px-4 py-2 rounded-full text-white text-sm border border-white/30">
                  <span class="opacity-80">Search:</span> <span class="font-medium">{{ searchQuery }}</span>
                  <button @click="searchQuery = ''; handleSearch()" class="ml-2 hover:text-red-300">
                    <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div v-if="selectedAuthorId" class="glass-effect px-4 py-2 rounded-full text-white text-sm border border-white/30">
                  <span class="opacity-80">Author:</span> <span class="font-medium">{{ getAuthorName(selectedAuthorId) }}</span>
                  <button @click="selectedAuthorId = ''; handleSearch()" class="ml-2 hover:text-red-300">
                    <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Results Count -->
            <div v-if="!books.loading" class="text-center mt-4 animate-fade-in-up animation-delay-600">
              <p class="text-white/80 text-sm">
                {{ filteredBooks.length }} {{ filteredBooks.length === 1 ? 'book' : 'books' }} found
              </p>
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
            class="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse hover-lift"
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
            class="glass-effect border border-red-300 rounded-3xl p-8 max-w-md mx-auto animate-fade-in-up shadow-xl"
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
              class="btn-primary text-white px-6 py-3 rounded-xl hover-lift shadow-lg"
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
            class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer animate-fade-in-up card-hover"
            :style="{ animationDelay: `${index * 100}ms` }"
            @click="goToBook(book.id)"
          >
            <!-- Book Cover -->
            <div class="relative overflow-hidden rounded-t-3xl">
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
                class="absolute top-4 right-4 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                {{ book.year }}
              </div>
            </div>

            <!-- Book Details -->
            <div class="p-6">
              <h3
                class="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2"
              >
                {{ book.title }}
              </h3>
              <p class="text-purple-600 font-medium mb-3">
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
                  class="px-3 py-1 bg-gradient-card text-purple-700 rounded-full text-xs font-medium hover:bg-purple-100 transition-colors duration-300"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Action Button -->
              <button
                class="w-full btn-primary text-white py-3 rounded-xl font-medium hover-lift shadow-lg"
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
              class="btn-primary text-white px-8 py-3 rounded-xl hover-lift shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section v-if="filteredBooks.length > 0" class="py-16 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-primary rounded-full animate-floating"></div>
        <div class="absolute bottom-20 right-16 w-24 h-24 bg-gradient-accent rounded-full animate-floating animation-delay-300"></div>
      </div>
      
      <div class="container mx-auto px-4 relative">
        <h2 class="text-4xl font-bold text-center mb-12 text-gradient-primary animate-fade-in-up">Why Our Books Matter</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center p-8 bg-gradient-card rounded-3xl shadow-xl hover-lift animate-fade-in-up">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Creative Stories</h3>
            <p class="text-gray-600">Each book offers unique perspectives and captivating storytelling approaches.</p>
          </div>
          <div class="text-center p-8 bg-gradient-card rounded-3xl shadow-xl hover-lift animate-fade-in-up animation-delay-200">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-accent rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Rich Narratives</h3>
            <p class="text-gray-600">Our authors craft compelling narratives that captivate readers worldwide.</p>
          </div>
          <div class="text-center p-8 glass-effect rounded-3xl shadow-xl hover-lift animate-fade-in-up animation-delay-400">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Reader Connection</h3>
            <p class="text-gray-600">Building lasting relationships between books and their devoted readers.</p>
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