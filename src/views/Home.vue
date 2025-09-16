<!-- src/views/Home.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <!-- Animated Book Loader -->
    <div v-if="isLoading" class="fixed inset-0 bg-gradient-hero z-50 flex items-center justify-center">
      <div class="text-center animate-fade-in">
        <!-- Animated Books Stack -->
        <div class="relative w-32 h-32 mx-auto mb-0">
          <div class="absolute inset-0 animate-bounce-in animation-delay-200">
            <div class="w-24 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm shadow-lg"></div>
          </div>
          <div class="absolute inset-0 animate-bounce-in animation-delay-400" style="top: 8px;">
            <div class="w-24 h-4 bg-gradient-to-r from-pink-400 to-orange-400 rounded-sm shadow-lg"></div>
          </div>
          <div class="absolute inset-0 animate-bounce-in animation-delay-600" style="top: 16px;">
            <div class="w-24 h-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-sm shadow-lg"></div>
          </div>
          <div class="absolute inset-0 animate-bounce-in animation-delay-800" style="top: 24px;">
            <div class="w-24 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-sm shadow-lg"></div>
          </div>
        </div>
        
        <!-- Loading Text -->
        <h2 class="text-3xl font-bold text-white mb-4 animate-fade-in-up animation-delay-1000">
             NovelHub
        </h2>
        <div class="flex justify-center space-x-2 animate-fade-in-up animation-delay-1200">
          <div class="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-0"></div>
          <div class="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-200"></div>
          <div class="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
       
<!-- Hero Section -->
<section class="py-20 relative overflow-hidden bg-gradient-hero">
  <!-- Animated Background Elements -->
  <div class="absolute inset-0 pointer-events-none opacity-20">
    <div class="floating-element absolute top-20 left-10 text-4xl">📚</div>
    <div class="floating-element absolute top-40 right-20 text-4xl">📖</div>
    <div class="floating-element absolute bottom-32 left-1/4 text-4xl">📕</div>
    <div class="floating-element absolute bottom-20 right-1/3 text-4xl">📘</div>
    <div class="floating-element absolute top-1/2 left-1/2 text-3xl">✨</div>
  </div>

  <div class="container mx-auto px-4 relative">
    <div class="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <!-- Left Content -->
      <div class="animate-fade-in-left max-w-3xl mx-auto">
        <h1 class="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Discover
          <span class="text-gradient-accent block">Amazing Books</span>
        </h1>
        <p class="text-xl text-white/90 max-w-2xl mb-10 leading-relaxed mx-auto">
          Explore curated collections of fiction, mystery, sci-fi, and more — written by world-class authors. 
          Your next great adventure awaits in the pages of extraordinary stories.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
          <router-link 
            to="/books" 
            class="btn-primary text-white px-8 py-4 rounded-2xl font-semibold hover-lift shadow-lg text-center"
          >
            Browse Books
          </router-link>
          <router-link 
            to="/admin" 
            class="btn-accent text-white px-8 py-4 rounded-2xl font-semibold shadow-lg text-center"
          >
            Admin Panel
          </router-link>
        </div>
      </div>

      <!-- Quick Stats Cards - Centered -->
      <div class="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-8 mt-16 max-w-4xl mx-auto animate-fade-in-up animation-delay-1000">
        <div class="glass-effect rounded-3xl p-8 shadow-xl hover-lift card-hover">
          <div class="text-4xl font-bold text-gradient-primary mb-2">{{ books.list.length }}</div>
          <div class="text-white/90 font-medium">Amazing Books</div>
        </div>
        <div class="glass-effect rounded-3xl p-8 shadow-xl hover-lift card-hover">
          <div class="text-4xl font-bold text-gradient-accent mb-2">{{ authors.list.length }}</div>
          <div class="text-white/90 font-medium">Talented Authors</div>
        </div>
        <div class="glass-effect rounded-3xl p-8 shadow-xl hover-lift card-hover">
          <div class="text-4xl font-bold text-gradient-primary mb-2">{{ uniqueGenres.length }}</div>
          <div class="text-white/90 font-medium">Unique Genres</div>
        </div>
      </div>
    </div>
  </div>
</section>

      <!-- Features Section -->
      <section class="py-20 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-primary rounded-full animate-floating"></div>
          <div class="absolute bottom-20 right-16 w-24 h-24 bg-gradient-accent rounded-full animate-floating animation-delay-300"></div>
          <div class="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-primary rounded-full animate-floating animation-delay-600"></div>
        </div>
        
        <div class="container mx-auto px-4 relative">
          <h2 class="text-5xl font-bold text-center mb-4 text-gradient-primary animate-fade-in-up">
            Why Choose NovelHub?
          </h2>
          <p class="text-xl text-gray-600 text-center mb-16 animate-fade-in-up animation-delay-200">
            Experience reading like never before with our innovative platform
          </p>
          
          <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div class="text-center p-8 bg-gradient-card rounded-3xl shadow-xl hover-lift card-hover animate-fade-in-up">
              <div class="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-800">Curated Selection</h3>
              <p class="text-gray-600 leading-relaxed">Handpicked books from top authors across multiple genres, ensuring quality reads every time.</p>
            </div>
            
            <div class="text-center p-8 bg-gradient-card rounded-3xl shadow-xl hover-lift card-hover animate-fade-in-up animation-delay-200">
              <div class="w-20 h-20 mx-auto mb-6 bg-gradient-accent rounded-2xl flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-800">Author Profiles</h3>
              <p class="text-gray-600 leading-relaxed">Get to know the brilliant minds behind your favorite stories with detailed author biographies.</p>
            </div>
            
            <div class="text-center p-8 bg-gradient-card rounded-3xl shadow-xl hover-lift card-hover animate-fade-in-up animation-delay-400">
              <div class="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-800">Easy Management</h3>
              <p class="text-gray-600 leading-relaxed">Powerful admin tools to manage your book collection and author database with ease.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Books Section -->
      <section class="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-bold mb-4 text-gradient-primary animate-fade-in-up">Latest Additions</h2>
            <p class="text-xl text-gray-600 animate-fade-in-up animation-delay-200">Discover our newest books and latest literary gems</p>
          </div>
          
          <!-- Loading State -->
          <div v-if="books.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="n in 4" :key="n" class="bg-white rounded-3xl shadow-xl animate-pulse hover-lift">
              <div class="h-64 bg-gray-200 rounded-t-3xl"></div>
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
              class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer animate-fade-in-up card-hover"
              :style="{ animationDelay: `${index * 150}ms` }"
              @click="goToBook(book.id)"
            >
              <div class="relative overflow-hidden rounded-t-3xl">
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
                <div class="absolute top-4 right-4 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {{ book.year }}
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                  {{ book.title }}
                </h3>
                <p class="text-purple-600 font-medium text-sm">
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
              class="btn-primary text-white px-8 py-3 rounded-2xl font-semibold hover-lift shadow-lg"
            >
              Add Books
            </router-link>
          </div>

          <!-- View All Button -->
          <div v-if="recentBooks.length > 0" class="text-center mt-12 animate-fade-in-up animation-delay-800">
            <router-link
              to="/books"
              class="btn-primary text-white px-8 py-4 rounded-2xl font-semibold hover-lift shadow-lg inline-flex items-center"
            >
              View All Books
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Featured Authors Section - Changed Background -->
      <section class="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-accent rounded-full animate-floating animation-delay-100"></div>
          <div class="absolute bottom-1/3 right-1/5 w-16 h-16 bg-gradient-primary rounded-full animate-floating animation-delay-400"></div>
        </div>

        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-bold mb-4 text-gradient-accent animate-fade-in-up">Featured Authors</h2>
            <p class="text-xl text-gray-600 animate-fade-in-up animation-delay-200">Meet the talented writers behind our amazing collection</p>
          </div>

          <!-- Authors Grid -->
          <div v-if="featuredAuthors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(author, index) in featuredAuthors"
              :key="author.id"
              class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover-lift card-hover cursor-pointer animate-fade-in-up border border-white/20"
              :style="{ animationDelay: `${index * 200}ms` }"
              @click="goToAuthor(author.id)"
            >
              <img
                :src="author.avatarUrl"
                :alt="author.name"
                class="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-purple-200/50 shadow-lg"
                @error="handleAuthorImageError"
              />
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ author.name }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{{ author.bio }}</p>
              <div class="text-gradient-accent font-medium text-sm">{{ getAuthorBooksCount(author.id) }} books</div>
            </div>
          </div>

          <!-- View All Authors Button -->
          <div v-if="featuredAuthors.length > 0" class="text-center mt-12 animate-fade-in-up animation-delay-600">
            <router-link
              to="/authors"
              class="btn-accent text-white px-8 py-4 rounded-2xl font-semibold hover-lift shadow-lg inline-flex items-center"
            >
              Meet All Authors
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>

          <!-- Empty State for Authors -->
          <div v-else class="text-center py-16">
            <div class="text-gray-400 mb-6">
              <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">No Featured Authors Yet</h3>
            <p class="text-gray-600 mb-8">Add authors and books to showcase them here!</p>
            <router-link
              to="/admin"
              class="btn-primary text-white px-8 py-3 rounded-2xl font-semibold hover-lift shadow-lg"
            >
              Add Authors
            </router-link>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Ready to Start Reading?</h2>
          <p class="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Join thousands of readers who have discovered their next favorite book through our curated collection.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
            <router-link
              to="/books"
              class="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Our Collection
            </router-link>
            <router-link
              to="/authors"
              class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Discover Authors
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import { useAuthorsStore } from '@/stores/authors'

const router = useRouter()
const books = useBooksStore()
const authors = useAuthorsStore()
const isLoading = ref(true)

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

const handleGifError = (event) => {
  // Fallback to placeholder if GIF fails to load
  event.target.src = 'https://via.placeholder.com/400x300/e5e7eb/9ca3af?text=Reading+Animation'
}

const loadData = async () => {
  try {
    await Promise.all([
      books.fetchList(),
      authors.fetchList()
    ])
    
    // Show loader for at least 2 seconds for better UX
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  } catch (error) {
    console.error('Error loading data:', error)
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}

onMounted(loadData)
</script>