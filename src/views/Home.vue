<!-- src/views/Home.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="py-20 text-center relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="floating-book absolute top-20 left-10 opacity-20">📚</div>
        <div class="floating-book absolute top-40 right-20 opacity-20" style="animation-delay: 1s;">📖</div>
        <div class="floating-book absolute bottom-32 left-1/4 opacity-20" style="animation-delay: 2s;">📕</div>
        <div class="floating-book absolute bottom-20 right-1/3 opacity-20" style="animation-delay: 3s;">📘</div>
      </div>

      <div class="container mx-auto px-4 relative">
        <h1 class="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 animate-fade-in-up">
          Discover Amazing Books
        </h1>
        <p class="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Explore curated collections of fiction, mystery, sci-fi, and more — written by world-class authors.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
          <router-link 
            to="/books" 
            class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse Books
          </router-link>
          <router-link 
            to="/admin" 
            class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Admin Panel
          </router-link>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ books.list.length }}</div>
            <div class="text-gray-600">Amazing Books</div>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ authors.list.length }}</div>
            <div class="text-gray-600">Talented Authors</div>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ uniqueGenres.length }}</div>
            <div class="text-gray-600">Unique Genres</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-800 mb-16 animate-fade-in-up">
          Why Choose Bookshelf?
        </h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up">
            <div class="text-blue-600 mb-6">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-gray-800">Curated Selection</h3>
            <p class="text-gray-600 leading-relaxed">Handpicked books from top authors across multiple genres, ensuring quality reads every time.</p>
          </div>
          
          <div class="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up animation-delay-200">
            <div class="text-purple-600 mb-6">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-gray-800">Author Profiles</h3>
            <p class="text-gray-600 leading-relaxed">Get to know the brilliant minds behind your favorite stories with detailed author biographies.</p>
          </div>
          
          <div class="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up animation-delay-400">
            <div class="text-green-600 mb-6">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-gray-800">Easy Management</h3>
            <p class="text-gray-600 leading-relaxed">Powerful admin tools to manage your book collection and author database with ease.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Books Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">Latest Additions</h2>
          <p class="text-xl text-gray-600 animate-fade-in-up animation-delay-200">Discover our newest books and latest literary gems</p>
        </div>
        
        <!-- Loading State -->
        <div v-if="books.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="n in 4" :key="n" class="bg-white rounded-2xl shadow-lg animate-pulse">
            <div class="h-64 bg-gray-200 rounded-t-2xl"></div>
            <div class="p-6 space-y-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Books Grid -->
        <div v-else-if="recentBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(book, index) in recentBooks"
            :key="book.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up"
            :style="{ animationDelay: `${index * 150}ms` }"
            @click="goToBook(book.id)"
          >
            <div class="relative overflow-hidden rounded-t-2xl">
              <img
                :src="book.coverUrl"
                :alt="book.title"
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-sm font-medium">Click to explore</p>
                </div>
              </div>
              <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ book.year }}
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {{ book.title }}
              </h3>
              <p class="text-blue-600 font-medium text-sm">
                by {{ getAuthorName(book.authorId) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="text-gray-400 mb-6">
            <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">No Books Available Yet</h3>
          <p class="text-gray-600 mb-8">Get started by adding some books to your collection</p>
          <router-link
            to="/admin"
            class="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Add Books
          </router-link>
        </div>

        <!-- View All Button -->
        <div v-if="recentBooks.length > 0" class="text-center mt-12 animate-fade-in-up animation-delay-800">
          <router-link
            to="/books"
            class="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Books
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Authors Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">Featured Authors</h2>
          <p class="text-xl text-gray-600 animate-fade-in-up animation-delay-200">Meet the talented writers behind our amazing collection</p>
        </div>

        <!-- Authors Grid -->
        <div v-if="featuredAuthors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div
            v-for="(author, index) in featuredAuthors"
            :key="author.id"
            class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up"
            :style="{ animationDelay: `${index * 200}ms` }"
            @click="goToAuthor(author.id)"
          >
            <img
              :src="author.avatarUrl"
              :alt="author.name"
              class="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200 shadow-lg"
              @error="handleAuthorImageError"
            />
            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ author.name }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{{ author.bio }}</p>
            <div class="text-blue-600 font-medium text-sm">{{ getAuthorBooksCount(author.id) }} books</div>
          </div>
        </div>

        <!-- View All Authors Button -->
        <div v-if="featuredAuthors.length > 0" class="text-center mt-12 animate-fade-in-up animation-delay-600">
          <router-link
            to="/authors"
            class="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Meet All Authors
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Ready to Start Reading?</h2>
        <p class="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Join thousands of readers who have discovered their next favorite book through our curated collection.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
          <router-link
            to="/books"
            class="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Our Collection
          </router-link>
          <router-link
            to="/authors"
            class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Discover Authors
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import { useAuthorsStore } from '@/stores/authors'

const router = useRouter()
const books = useBooksStore()
const authors = useAuthorsStore()

const recentBooks = computed(() => {
  return books.list
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)
})

const featuredAuthors = computed(() => {
  return authors.list
    .filter(author => books.booksByAuthorId(author.id).length > 0)
    .slice(0, 3)
})

const uniqueGenres = computed(() => {
  const genres = new Set()
  books.list.forEach(book => {
    book.tags.forEach(tag => genres.add(tag))
  })
  return Array.from(genres)
})

const getAuthorName = (authorId) => {
  const author = authors.authorById(authorId)
  return author ? author.name : 'Unknown Author'
}

const getAuthorBooksCount = (authorId) => {
  return books.booksByAuthorId(authorId).length
}

const goToBook = (id) => {
  router.push({ name: 'BookDetail', params: { id: id.toString() } })
}

const goToAuthor = (id) => {
  router.push({ name: 'AuthorDetail', params: { id: id.toString() } })
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x400/e5e7eb/9ca3af?text=No+Image'
}

const handleAuthorImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/80x80/e5e7eb/9ca3af?text=Author'
}

const loadData = async () => {
  try {
    await Promise.all([
      books.fetchList(),
      authors.fetchList()
    ])
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

onMounted(loadData)
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

@keyframes floating {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-800 { animation-delay: 800ms; }

.floating-book {
  font-size: 2rem;
  animation: floating 6s ease-in-out infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>