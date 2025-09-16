<!-- src/views/admin/AuthorsCRUD.vue -->
<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Authors Management</h1>
          <p class="text-gray-600">Manage author profiles and information</p>
        </div>
        <router-link
          to="/admin/authors/new"
          class="mt-4 md:mt-0 inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add New Author
        </router-link>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Authors</p>
            <p class="text-3xl font-bold text-purple-600">{{ authors.list.length }}</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-2xl">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up animation-delay-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Authors</p>
            <p class="text-3xl font-bold text-green-600">{{ activeAuthors.length }}</p>
          </div>
          <div class="p-3 bg-green-100 rounded-2xl">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up animation-delay-400">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Books</p>
            <p class="text-3xl font-bold text-blue-600">{{ books.list.length }}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-2xl">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

   <!-- Search and Filters -->
    <div class="bg-white rounded-2xl p-6 shadow-lg mb-8 animate-fade-in-up animation-delay-600">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search authors by name or bio..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5极速a7 7 0 11-14 0 7 7 极速0 0114 0z"></path>
          </svg>
        </div>
        <div class="flex flex-row gap-2">
          <button
            @click="clearSearch"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium"
          >
            Clear
          </button>
          <button
            @click="loadAuthors"
            class="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300 font-medium"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-if="authors.error" class="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-red-800">Error Loading Authors</h3>
          <p class="text-red-600">{{ authors.error }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="authors.loading" class="space-y-4">
      <div v-for="n in 5" :key="n" class="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div class="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
        </div>
      </div>
    </div>

    <!-- Authors List (Row Layout) -->
    <div v-else-if="filteredAuthors.length > 0" class="space-y-4">
      <div
        v-for="(author, index) in filteredAuthors"
        :key="author.id"
        class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <!-- Author Avatar -->
            <div class="flex-shrink-0">
              <img
                :src="author.avatarUrl"
                :alt="author.name"
                class="w-16 h-16 object-cover rounded-full border-2 border-purple-100 shadow-md"
                @error="handleImageError"
              />
            </div>

            <!-- Author Details -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {{ author.name }}
                  </h3>
                  <p class="text-purple-600 font-medium text-sm mb-2">
                    {{ getAuthorBooksCount(author.id) }} book{{ getAuthorBooksCount(author.id) !== 1 ? 's' : '' }}
                  </p>
                  <div class="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                    <span>Joined: {{ formatDate(author.createdAt) }}</span>
                    <span class="hidden md:inline">•</span>
                    <span>Updated: {{ formatDate(author.updatedAt) }}</span>
                  </div>
                </div>

                <!-- Actions - Now positioned at top right for mobile -->
                <div class="flex justify-end md:justify-start space-x-2 mb-4 md:mb-0 md:ml-4">
                  <router-link
                    :to="{ name: 'AdminAuthorEdit', params: { id: author.id } }"
                    class="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-300"
                    title="Edit Author"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </router-link>
                  
                  <router-link
                    :to="{ name: 'AuthorDetail', params: { id: author.id } }"
                    class="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-300"
                    title="View Profile"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </router-link>

                  <button
                    @click="confirmDelete(author)"
                    class="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-300"
                    title="Delete Author"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Bio -->
          <div class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-gray-700 text-sm line-clamp-2 mb-3">{{ author.bio }}</p>
            
            <!-- Recent Books -->
            <div v-if="getAuthorBooks(author.id).length > 0" class="flex items-center space-x-3">
              <span class="text-xs font-medium text-gray-600">Recent books:</span>
              <div class="flex space-x-2">
                <img
                  v-for="book in getAuthorBooks(author.id).slice(0, 3)"
                  :key="book.id"
                  :src="book.coverUrl"
                  :alt="book.title"
                  :title="book.title"
                  class="w-8 h-10 rounded object-cover shadow-sm border hover:scale-110 transition-transform duration-200"
                  @error="handleBookImageError"
                />
                <span v-if="getAuthorBooks(author.id).length > 3" class="flex items-center justify-center w-8 h-10 bg-gray-100 rounded text-xs text-gray-500 font-medium">
                  +{{ getAuthorBooks(author.id).length - 3 }}
                </span>
              </div>
            </div>
            <div v-else class="text-xs text-gray-400 italic">
              No books published yet
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="text-gray-400 mb-6">
        <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      </div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">No Authors Found</h3>
      <p class="text-gray-600 mb-8">
        {{ searchQuery ? 'No authors match your search criteria' : 'Get started by adding your first author' }}
      </p>
      <router-link
        to="/admin/authors/new"
        class="inline-flex items-center bg-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-purple-700 transition-colors duration-300"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Your First Author
        </router-link>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-8 max-w-md w-full animate-fade-in transform scale-95 hover:scale-100 transition-transform duration-300">
        <div class="text-center mb-6">
          <div class="text-red-600 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Delete Author</h3>
          <p class="text-gray-600 mb-2">Are you sure you want to delete "{{ authorToDelete?.name }}"?</p>
          <p class="text-sm text-red-600">This will also delete all books by this author. This action cannot be undone.</p>
        </div>
        
        <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button
            @click="showDeleteModal = false"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            @click="deleteAuthor"
            class="flex-1 px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors duration-300 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthorsStore } from '@/stores/authors'
import { useBooksStore } from '@/stores/books'

const authors = useAuthorsStore()
const books = useBooksStore()

const searchQuery = ref('')
const showDeleteModal = ref(false)
const authorToDelete = ref(null)

const filteredAuthors = computed(() => {
  return authors.filteredAuthors(searchQuery.value)
})

const activeAuthors = computed(() => {
  return authors.list.filter(author => 
    books.booksByAuthorId(author.id).length > 0
  )
})

const getAuthorBooksCount = (authorId) => {
  return books.booksByAuthorId(authorId).length
}

const getAuthorBooks = (authorId) => {
  return books.booksByAuthorId(authorId)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/64x64/e5e7eb/9ca3af?text=Author'
}

const handleBookImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/32x40/e5e7eb/9ca3af?text=Book'
}

const clearSearch = () => {
  searchQuery.value = ''
}

const confirmDelete = (author) => {
  authorToDelete.value = author
  showDeleteModal.value = true
}

const deleteAuthor = async () => {
  try {
    // Delete all books by this author first
    const authorBooks = books.booksByAuthorId(authorToDelete.value.id)
    for (const book of authorBooks) {
      await books.remove(book.id)
    }
    
    // Then delete the author
    await authors.remove(authorToDelete.value.id)
    
    showDeleteModal.value = false
    authorToDelete.value = null
  } catch (error) {
    console.error('Failed to delete author:', error)
  }
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
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

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

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .p-8 {
    padding: 1.5rem;
  }
  
  .mb-8 {
    margin-bottom: 1.5rem;
  }
  
  .grid.grid-cols-1 {
    gap: 1rem;
  }
  
  .bg-white.rounded-2xl.p-6 {
    padding: 1rem;
  }
  
  .flex.flex-col.gap-4 > div:first-child {
    width: 100%;
  }
  
  .flex.flex-col.gap-2 {
    width: 100%;
  }
  
  .flex.flex-col.gap-2 button {
    width: 100%;
  }
}
</style>
