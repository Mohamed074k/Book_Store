<!-- src/views/Authors.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4 animate-fade-in-up">
            Meet Our Authors
          </h1>
          <p class="text-xl opacity-90 mb-8 animate-fade-in-up animation-delay-200">
            Discover the brilliant minds behind your favorite stories
          </p>
          
          <!-- Search -->
          <div class="max-w-xl mx-auto animate-fade-in-up animation-delay-300">
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Search authors by name or bio..."
                class="w-full px-6 py-4 rounded-2xl text-gray-800 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 transform focus:scale-105"
              />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Authors Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="authors.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="n in 6"
            :key="n"
            class="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
          >
            <div class="p-8 text-center">
              <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="authors.error" class="text-center py-16">
          <div class="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <div class="text-red-600 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
            <p class="text-gray-600 mb-6">{{ authors.error }}</p>
            <button
              @click="loadAuthors"
              class="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Authors Grid -->
        <div v-else-if="filteredAuthors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(author, index) in filteredAuthors"
            :key="author.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up"
            :style="{ animationDelay: `${index * 150}ms` }"
            @click="goToAuthor(author.id)"
          >
            <!-- Author Card -->
            <div class="p-8 text-center">
              <!-- Avatar -->
              <div class="relative mb-6">
                <img
                  :src="author.avatarUrl"
                  :alt="author.name"
                  class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-purple-100 group-hover:border-purple-300 transition-all duration-300 shadow-lg"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-tr from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <!-- Author Info -->
              <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                {{ author.name }}
              </h3>
              
              <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                {{ author.bio }}
              </p>

              <!-- Stats -->
              <div class="flex justify-center space-x-6 mb-6 text-sm">
                <div class="text-center">
                  <div class="font-bold text-purple-600 text-lg">{{ getAuthorBooksCount(author.id) }}</div>
                  <div class="text-gray-500">Books</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-indigo-600 text-lg">{{ formatDate(author.createdAt) }}</div>
                  <div class="text-gray-500">Joined</div>
                </div>
              </div>

              <!-- Action Button -->
              <button class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform group-hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg">
                View Profile
              </button>
            </div>

            <!-- Books Preview -->
            <div v-if="getAuthorBooks(author.id).length > 0" class="px-6 pb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Recent Books:</h4>
              <div class="flex space-x-2 overflow-x-auto">
                <div
                  v-for="book in getAuthorBooks(author.id).slice(0, 3)"
                  :key="book.id"
                  class="flex-shrink-0"
                >
                  <img
                    :src="book.coverUrl"
                    :alt="book.title"
                    class="w-12 h-16 rounded object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
                    @error="handleBookImageError"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="max-w-md mx-auto">
            <div class="text-gray-400 mb-6">
              <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">No authors found</h3>
            <p class="text-gray-600 mb-6">
              {{ searchQuery ? 'Try adjusting your search criteria' : 'No authors available yet' }}
            </p>
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-colors duration-300"
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section v-if="filteredAuthors.length > 0" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Why Our Authors Matter</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center p-6 animate-fade-in-up">
            <div class="text-purple-600 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Creative Vision</h3>
            <p class="text-gray-600">Each author brings unique perspectives and storytelling approaches.</p>
          </div>
          <div class="text-center p-6 animate-fade-in-up animation-delay-200">
            <div class="text-indigo-600 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Rich Stories</h3>
            <p class="text-gray-600">Our authors craft compelling narratives that captivate readers worldwide.</p>
          </div>
          <div class="text-center p-6 animate-fade-in-up animation-delay-400">
            <div class="text-pink-600 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Reader Connection</h3>
            <p class="text-gray-600">Building lasting relationships between authors and their devoted readers.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthorsStore } from '@/stores/authors'
import { useBooksStore } from '@/stores/books'

const router = useRouter()
const authors = useAuthorsStore()
const books = useBooksStore()

const searchQuery = ref('')

const filteredAuthors = computed(() => {
  return authors.filteredAuthors(searchQuery.value)
})

const getAuthorBooksCount = (authorId) => {
  return books.booksByAuthorId(authorId).length
}

const getAuthorBooks = (authorId) => {
  return books.booksByAuthorId(authorId)
}

const formatDate = (dateString) => {
  return new Date(dateString).getFullYear()
}

const goToAuthor = (id) => {
  router.push({ name: 'AuthorDetail', params: { id: id.toString() } })
}

const handleSearch = () => {
  // This will trigger the computed property to re-evaluate
}

const clearSearch = () => {
  searchQuery.value = ''
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/96x96/e5e7eb/9ca3af?text=Author'
}

const handleBookImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/48x64/e5e7eb/9ca3af?text=Book'
}

const loadAuthors = async () => {
  await Promise.all([
    authors.fetchList(),
    books.fetchList()
  ])
}

onMounted(loadAuthors)
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>