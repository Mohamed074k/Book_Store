<!-- src/views/BookDetail.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <!-- Loading State -->
    <div v-if="books.loading" class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Image Skeleton -->
            <div class="bg-gray-200/50 rounded-3xl animate-pulse h-96"></div>
            <!-- Content Skeleton -->
            <div class="space-y-6">
              <div class="h-8 bg-gray-200/50 rounded w-3/4 animate-pulse"></div>
              <div class="h-6 bg-gray-200/50 rounded w-1/2 animate-pulse"></div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200/50 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200/50 rounded animate-pulse"></div>
                <div class="h-4 bg-gray-200/50 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="books.error" class="py-20">
      <div class="container mx-auto px-4 text-center">
        <div class="glass-effect border border-red-300 rounded-3xl p-8 max-w-md mx-auto shadow-xl">
          <div class="text-red-600 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Book Not Found</h3>
          <p class="text-gray-600 mb-6">{{ books.error }}</p>
          <button
            @click="$router.push('/books')"
            class="btn-primary text-white px-6 py-3 rounded-xl hover-lift shadow-lg"
          >
            Back to Books
          </button>
        </div>
      </div>
    </div>

    <!-- Book Detail -->
    <div v-else-if="book" class="py-20">
      <!-- Breadcrumb -->
      <div class="container mx-auto px-4 mb-8">
        <nav class="flex space-x-2 text-sm text-gray-600 animate-fade-in">
          <router-link to="/" class="hover:text-purple-600 transition-colors">Home</router-link>
          <span>/</span>
          <router-link to="/books" class="hover:text-purple-600 transition-colors">Books</router-link>
          <span>/</span>
          <span class="text-gray-800">{{ book.title }}</span>
        </nav>
      </div>

      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-12 items-start">
            <!-- Book Cover -->
            <div class="animate-fade-in-left">
              <div class="relative group">
                <img
                  :src="book.coverUrl"
                  :alt="book.title"
                  class="w-full max-w-md mx-auto rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Year Badge -->
                <div class="absolute top-6 right-6 bg-gradient-primary text-white px-4 py-2 rounded-2xl font-bold text-lg shadow-lg">
                  {{ book.year }}
                </div>
              </div>
            </div>

            <!-- Book Information -->
            <div class="space-y-6 animate-fade-in-right">
              <!-- Title & Author -->
              <div>
                <h1 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                  {{ book.title }}
                </h1>
                <p class="text-xl text-purple-600 font-semibold mb-2">
                  by 
                  <router-link
                    :to="{ name: 'AuthorDetail', params: { id: book.authorId } }"
                    class="hover:text-purple-800 transition-colors underline decoration-2 underline-offset-4"
                  >
                    {{ authorName }}
                  </router-link>
                </p>
                <p class="text-gray-600">Published in {{ book.year }}</p>
              </div>

              <!-- Tags -->
              <div v-if="book.tags && book.tags.length > 0">
                <h3 class="text-sm font-medium text-gray-700 mb-3">GENRES</h3>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="tag in book.tags"
                    :key="tag"
                    class="px-4 py-2 bg-purple-100/70 text-purple-800 rounded-xl text-sm font-medium border border-purple-200/50 hover:bg-purple-200/70 transition-all duration-300 transform hover:scale-105"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">About This Book</h3>
                <p class="text-gray-700 leading-relaxed text-lg">
                  {{ book.description }}
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-4 pt-6">
                <button class="btn-primary text-white px-8 py-4 rounded-2xl font-semibold hover-lift shadow-lg">
                  Read Now
                </button>
                <button class="btn-accent text-white px-8 py-4 rounded-2xl font-semibold hover-lift shadow-lg">
                  Add to Wishlist
                </button>
                <button
                  @click="shareBook"
                  class="glass-effect text-gray-700 px-6 py-4 rounded-2xl font-semibold hover-lift shadow-lg border border-gray-200/50"
                >
                  <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  Share
                </button>
              </div>

              <!-- Book Details -->
              <div class="glass-effect rounded-2xl p-6 shadow-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Book Details</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">Added:</span>
                    <span class="font-medium text-gray-800 ml-2">{{ formatDate(book.createdAt) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Updated:</span>
                    <span class="font-medium text-gray-800 ml-2">{{ formatDate(book.updatedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Author Info Card -->
          <div v-if="author" class="mt-16 glass-effect rounded-3xl shadow-xl p-8 animate-fade-in-up">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">About the Author</h2>
            <div class="flex flex-col md:flex-row gap-6 items-start">
              <img
                :src="author.avatarUrl"
                :alt="author.name"
                class="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-purple-200/50"
                @error="handleAuthorImageError"
              />
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ author.name }}</h3>
                <p class="text-gray-700 leading-relaxed mb-4">{{ author.bio }}</p>
                <router-link
                  :to="{ name: 'AuthorDetail', params: { id: author.id } }"
                  class="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
                >
                  View Author Profile
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Related Books -->
          <div v-if="relatedBooks.length > 0" class="mt-16">
            <h2 class="text-2xl font-bold text-gray-800 mb-8">More from {{ authorName }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="relatedBook in relatedBooks"
                :key="relatedBook.id"
                class="glass-effect rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fade-in-up card-hover"
                @click="goToBook(relatedBook.id)"
              >
                <img
                  :src="relatedBook.coverUrl"
                  :alt="relatedBook.title"
                  class="w-full h-48 object-cover rounded-t-3xl"
                  @error="handleImageError"
                />
                <div class="p-4">
                  <h3 class="font-semibold text-gray-800 mb-1">{{ relatedBook.title }}</h3>
                  <p class="text-sm text-gray-600">{{ relatedBook.year }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import { useAuthorsStore } from '@/stores/authors'

const route = useRoute()
const router = useRouter()
const books = useBooksStore()
const authors = useAuthorsStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const book = computed(() => books.selected)
const author = computed(() => {
  if (book.value) {
    return authors.authorById(book.value.authorId)
  }
  return null
})

const authorName = computed(() => {
  return author.value ? author.value.name : 'Unknown Author'
})

const relatedBooks = computed(() => {
  if (book.value) {
    return books.booksByAuthorId(book.value.authorId)
      .filter(b => b.id !== book.value.id)
      .slice(0, 3)
  }
  return []
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x600/e5e7eb/9ca3af?text=No+Image'
}

const handleAuthorImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/96x96/e5e7eb/9ca3af?text=Author'
}

const goToBook = (id) => {
  router.push({ name: 'BookDetail', params: { id: id.toString() } })
}

const shareBook = () => {
  if (navigator.share && book.value) {
    navigator.share({
      title: book.value.title,
      text: `Check out "${book.value.title}" by ${authorName.value}`,
      url: window.location.href
    }).catch(console.error)
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!')
    }).catch(console.error)
  }
}

const loadBookAndAuthor = async () => {
  const bookId = parseInt(props.id)
  
  // Load books and authors if not already loaded
  if (books.list.length === 0) {
    await books.fetchList()
  }
  if (authors.list.length === 0) {
    await authors.fetchList()
  }
  
  // Set the selected book
  const foundBook = books.bookById(bookId)
  if (foundBook) {
    books.selected = foundBook
  } else {
    await books.fetchById(bookId)
  }
}

watch(() => props.id, loadBookAndAuthor, { immediate: true })

onMounted(loadBookAndAuthor)
</script>