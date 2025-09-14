<!-- src/views/admin/BookForm.vue -->
<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            {{ isEditing ? 'Edit Book' : 'Add New Book' }}
          </h1>
          <p class="text-gray-600">
            {{ isEditing ? 'Update book information' : 'Create a new book entry' }}
          </p>
        </div>
        <router-link
          to="/admin/books"
          class="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Books
        </router-link>
      </div>
    </div>

    <!-- Form Card -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
        <!-- Form Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 class="text-xl font-semibold text-white">Book Details</h2>
        </div>

        <!-- Form Content -->
        <form @submit.prevent="handleSubmit" class="p-8">
          <!-- Error Alert -->
          <div v-if="books.error" class="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <p class="text-sm text-red-600">{{ books.error }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Title -->
              <div class="animate-fade-in-up">
                <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300"
                  :class="{ 'border-red-500': errors.title }"
                  placeholder="Enter the book title"
                />
                <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
              </div>

              <!-- Author -->
              <div class="animate-fade-in-up animation-delay-200">
                <label for="authorId" class="block text-sm font-semibold text-gray-700 mb-2">
                  Author *
                </label>
                <select
                  id="authorId"
                  v-model="form.authorId"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300"
                  :class="{ 'border-red-500': errors.authorId }"
                >
                  <option value="">Select an author</option>
                  <option v-for="author in authors.list" :key="author.id" :value="author.id">
                    {{ author.name }}
                  </option>
                </select>
                <p v-if="errors.authorId" class="mt-1 text-sm text-red-600">{{ errors.authorId }}</p>
              </div>

              <!-- Year -->
              <div class="animate-fade-in-up animation-delay-300">
                <label for="year" class="block text-sm font-semibold text-gray-700 mb-2">
                  Publication Year *
                </label>
                <input
                  id="year"
                  v-model.number="form.year"
                  type="number"
                  min="1000"
                  :max="currentYear"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300"
                  :class="{ 'border-red-500': errors.year }"
                  placeholder="e.g. 2023"
                />
                <p v-if="errors.year" class="mt-1 text-sm text-red-600">{{ errors.year }}</p>
              </div>

              <!-- Tags -->
              <div class="animate-fade-in-up animation-delay-400">
                <label for="tags" class="block text-sm font-semibold text-gray-700 mb-2">
                  Genres/Tags
                </label>
                <div class="space-y-3">
                  <input
                    id="tags"
                    v-model="tagInput"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300"
                    placeholder="Type a tag and press Enter"
                    @keydown.enter.prevent="addTag"
                  />
                  <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2">
                    <span
                      v-for="(tag, index) in form.tags"
                      :key="index"
                      class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {{ tag }}
                      <button
                        type="button"
                        @click="removeTag(index)"
                        class="ml-2 w-4 h-4 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                  <p class="text-xs text-gray-500">Press Enter to add tags. Common tags: fantasy, mystery, romance, sci-fi, thriller</p>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Cover URL -->
              <div class="animate-fade-in-up animation-delay-500">
                <label for="coverUrl" class="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  id="coverUrl"
                  v-model="form.coverUrl"
                  type="url"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300"
                  placeholder="https://example.com/book-cover.jpg"
                />
                <p class="text-xs text-gray-500 mt-1">Leave empty to use a placeholder image</p>
                
                <!-- Image Preview -->
                <div v-if="form.coverUrl" class="mt-4">
                  <img
                    :src="form.coverUrl || placeholderImage"
                    alt="Book cover preview"
                    class="w-32 h-40 object-cover rounded-lg shadow-md border"
                    @error="handleImageError"
                  />
                </div>
              </div>

              <!-- Description -->
              <div class="animate-fade-in-up animation-delay-600">
                <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 resize-none"
                  :class="{ 'border-red-500': errors.description }"
                  placeholder="Enter a compelling description of the book..."
                ></textarea>
                <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ form.description.length }}/500 characters</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-700">
            <button
              type="submit"
              :disabled="books.loading"
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span v-if="books.loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>
                {{ isEditing ? 'Update Book' : 'Create Book' }}
              </span>
            </button>
            
            <button
              type="button"
              @click="$router.push('/admin/books')"
              class="flex-1 sm:flex-none px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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
    default: null
  }
})

const isEditing = computed(() => !!props.id)
const currentYear = new Date().getFullYear()
const placeholderImage = 'https://via.placeholder.com/300x400/e5e7eb/9ca3af?text=Book+Cover'

const form = ref({
  title: '',
  authorId: '',
  year: currentYear,
  tags: [],
  coverUrl: '',
  description: ''
})

const tagInput = ref('')
const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.title.trim()) {
    errors.value.title = 'Title is required'
  }
  
  if (!form.value.authorId) {
    errors.value.authorId = 'Please select an author'
  }
  
  if (!form.value.year || form.value.year < 1000 || form.value.year > currentYear) {
    errors.value.year = `Year must be between 1000 and ${currentYear}`
  }
  
  if (!form.value.description.trim()) {
    errors.value.description = 'Description is required'
  } else if (form.value.description.length > 500) {
    errors.value.description = 'Description must be less than 500 characters'
  }

  // Check for duplicate title by same author
  if (books.duplicateTitleExists(form.value.title, form.value.authorId, isEditing.value ? parseInt(props.id) : null)) {
    errors.value.title = 'This author already has a book with this title'
  }
  
  return Object.keys(errors.value).length === 0
}

const addTag = () => {
  const tag = tagInput.value.trim().toLowerCase()
  if (tag && !form.value.tags.includes(tag)) {
    form.value.tags.push(tag)
  }
  tagInput.value = ''
}

const removeTag = (index) => {
  form.value.tags.splice(index, 1)
}

const handleImageError = (event) => {
  event.target.src = placeholderImage
}

const loadBookData = async () => {
  if (isEditing.value) {
    const bookId = parseInt(props.id)
    const book = books.bookById(bookId)
    
    if (book) {
      form.value = {
        title: book.title,
        authorId: book.authorId,
        year: book.year,
        tags: [...book.tags],
        coverUrl: book.coverUrl,
        description: book.description
      }
    } else {
      // Fetch the book if not in store
      await books.fetchById(bookId)
      if (books.selected) {
        form.value = {
          title: books.selected.title,
          authorId: books.selected.authorId,
          year: books.selected.year,
          tags: [...books.selected.tags],
          coverUrl: books.selected.coverUrl,
          description: books.selected.description
        }
      }
    }
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  const bookData = {
    title: form.value.title.trim(),
    authorId: form.value.authorId,
    year: form.value.year,
    tags: form.value.tags,
    coverUrl: form.value.coverUrl.trim() || placeholderImage,
    description: form.value.description.trim()
  }

  try {
    if (isEditing.value) {
      await books.update(parseInt(props.id), bookData)
    } else {
      await books.create(bookData)
    }
    
    router.push('/admin/books')
  } catch (error) {
    console.error('Error saving book:', error)
  }
}

const loadData = async () => {
  await Promise.all([
    books.fetchList(),
    authors.fetchList()
  ])
  
  if (isEditing.value) {
    await loadBookData()
  }
}

watch(() => props.id, loadBookData)

onMounted(loadData)
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

.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-500 { animation-delay: 500ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-700 { animation-delay: 700ms; }
</style>