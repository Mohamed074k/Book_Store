<!-- src/views/admin/AuthorForm.vue -->
<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            {{ isEditing ? 'Edit Author' : 'Add New Author' }}
          </h1>
          <p class="text-gray-600">
            {{ isEditing ? 'Update author information' : 'Create a new author profile' }}
          </p>
        </div>
        <router-link
          to="/admin/authors"
          class="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Authors
        </router-link>
      </div>
    </div>

    <!-- Form Card -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
        <!-- Form Header -->
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
          <h2 class="text-xl font-semibold text-white">Author Information</h2>
        </div>

        <!-- Form Content -->
        <form @submit.prevent="handleSubmit" class="p-8">
          <!-- Error Alert -->
          <div v-if="authors.error" class="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <p class="text-sm text-red-600">{{ authors.error }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Name -->
              <div class="animate-fade-in-up">
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300"
                  :class="{ 'border-red-500': errors.name }"
                  placeholder="Enter the author's full name"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <!-- Avatar Image Upload with Drag and Drop -->
              <div class="animate-fade-in-up animation-delay-200">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Author Avatar
                </label>
                
                <!-- Drag and Drop Area -->
                <div
                  @dragover.prevent
                  @dragenter.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleDrop"
                  @click="triggerFileInput"
                  class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 cursor-pointer"
                  :class="{ 'border-purple-400 bg-purple-50': isDragging }"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileSelect"
                  />
                  
                  <div v-if="!form.avatarUrl && !uploadedImageUrl">
                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <p class="text-gray-600 mb-2">Drag and drop an avatar image here, or click to select</p>
                    <p class="text-xs text-gray-500">Supports PNG, JPG, JPEG files up to 5MB</p>
                  </div>
                  
                  <!-- Image Preview -->
                  <div v-else class="relative inline-block">
                    <img
                      :src="uploadedImageUrl || form.avatarUrl"
                      alt="Author avatar preview"
                      class="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-purple-100 mx-auto"
                      @error="handleImageError"
                    />
                    <button
                      type="button"
                      @click.stop="removeImage"
                      class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center shadow-lg"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <p class="text-xs text-gray-500 mt-3">Click to change avatar</p>
                  </div>
                </div>

                <!-- URL Input (Alternative) -->
                <div class="mt-4">
                  <label for="avatarUrl" class="block text-xs font-medium text-gray-600 mb-1">
                    Or enter avatar image URL:
                  </label>
                  <input
                    id="avatarUrl"
                    v-model="form.avatarUrl"
                    type="url"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300"
                    placeholder="https://example.com/avatar.jpg"
                    @input="uploadedImageUrl = ''"
                  />
                </div>
              </div>

              <!-- Author Stats (if editing) -->
              <div v-if="isEditing && author" class="animate-fade-in-up animation-delay-300">
                <div class="bg-gray-50 rounded-2xl p-4">
                  <h3 class="text-sm font-semibold text-gray-700 mb-3">Author Statistics</h3>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-purple-600">{{ authorBooks.length }}</div>
                      <div class="text-gray-600">Published Books</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-indigo-600">{{ formatYear(author.createdAt) }}</div>
                      <div class="text-gray-600">Member Since</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Bio -->
              <div class="animate-fade-in-up animation-delay-400">
                <label for="bio" class="block text-sm font-semibold text-gray-700 mb-2">
                  Biography *
                </label>
                <textarea
                  id="bio"
                  v-model="form.bio"
                  rows="8"
                  required
                  class=" w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 resize-none"
                  :class="{ 'border-red-500': errors.bio }"
                  placeholder="Write a compelling biography about the author, their background, writing style, achievements, and notable works..."
                ></textarea>
                <p v-if="errors.bio" class="mt-1 text-sm text-red-600">{{ errors.bio }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ form.bio.length }}/1000 characters</p>
              </div>

              <!-- Books by Author (if editing and has books) -->
              <div v-if="isEditing && authorBooks.length > 0" class="animate-fade-in-up animation-delay-500">
                <h3 class="text-sm font-semibold text-gray-700 mb-3">Books by this Author</h3>
                <div class="space-y-3 max-h-64 overflow-y-auto">
                  <div
                    v-for="book in authorBooks"
                    :key="book.id"
                    class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <img
                      :src="book.coverUrl"
                      :alt="book.title"
                      class="w-10 h-12 object-cover rounded"
                      @error="handleBookImageError"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-800 truncate">{{ book.title }}</p>
                      <p class="text-xs text-gray-500">{{ book.year }}</p>
                    </div>
                    <router-link
                      :to="{ name: 'AdminBookEdit', params: { id: book.id } }"
                      class="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Author Details (if editing) -->
          <div v-if="isEditing && author" class="mt-8 pt-8 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Author Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-600 font-medium">Profile Created:</span>
                <span class="text-gray-800 ml-2">{{ formatFullDate(author.createdAt) }}</span>
              </div>
              <div>
                <span class="text-gray-600 font-medium">Last Updated:</span>
                <span class="text-gray-800 ml-2">{{ formatFullDate(author.updatedAt) }}</span>
              </div>
              <div>
                <span class="text-gray-600 font-medium">Total Books:</span>
                <span class="text-gray-800 ml-2">{{ authorBooks.length }} published</span>
              </div>
              <div>
                <span class="text-gray-600 font-medium">Author ID:</span>
                <span class="text-gray-800 ml-2">#{{ author.id }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-600">
            <button
              type="submit"
              :disabled="authors.loading"
              class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span v-if="authors.loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>
                {{ isEditing ? 'Update Author' : 'Create Author' }}
              </span>
            </button>
            
            <button
              type="button"
              @click="$router.push('/admin/authors')"
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
import { useAuthorsStore } from '@/stores/authors'
import { useBooksStore } from '@/stores/books'
import { normalizeId } from '@/utils/idHelpers'

const route = useRoute()
const router = useRouter()
const authors = useAuthorsStore()
const books = useBooksStore()

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const isEditing = computed(() => !!props.id)
const placeholderImage = 'https://via.placeholder.com/128x128/e5e7eb/9ca3af?text=Author'

const form = ref({
  name: '',
  bio: '',
  avatarUrl: ''
})

const errors = ref({})
const isDragging = ref(false)
const uploadedImageUrl = ref('')
const fileInput = ref(null)

const author = computed(() => authors.selected)

const authorBooks = computed(() => {
  if (author.value) {
    return books.booksByAuthorId(author.value.id)
  }
  return []
})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Author name is required'
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = 'Author name must be at least 2 characters long'
  }
  
  if (!form.value.bio.trim()) {
    errors.value.bio = 'Biography is required'
  } else if (form.value.bio.length > 1000) {
    errors.value.bio = 'Biography must be less than 1000 characters'
  } else if (form.value.bio.trim().length < 20) {
    errors.value.bio = 'Biography should be at least 20 characters long'
  }
  
  return Object.keys(errors.value).length === 0
}

const formatYear = (dateString) => {
  return new Date(dateString).getFullYear()
}

const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = placeholderImage
}

const handleBookImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/40x48/e5e7eb/9ca3af?text=Book'
}

// Image upload functions
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processImageFile(file)
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  if (files.length > 0) {
    processImageFile(files[0])
  }
}

const processImageFile = (file) => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file (PNG, JPG, JPEG)')
    return
  }

  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB')
    return
  }

  // Create a local URL for preview
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedImageUrl.value = e.target.result
    form.value.avatarUrl = '' // Clear URL input when file is uploaded
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  uploadedImageUrl.value = ''
  form.value.avatarUrl = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const loadAuthorData = async () => {
  if (isEditing.value) {
    const authorId = normalizeId(props.id) // Use normalizeId here
    const existingAuthor = authors.authorById(authorId)
    
    if (existingAuthor) {
      authors.selected = existingAuthor
      form.value = {
        name: existingAuthor.name,
        bio: existingAuthor.bio,
        avatarUrl: existingAuthor.avatarUrl
      }
    } else {
      // Fetch the author if not in store
      await authors.fetchById(authorId)
      if (authors.selected) {
        form.value = {
          name: authors.selected.name,
          bio: authors.selected.bio,
          avatarUrl: authors.selected.avatarUrl
        }
      }
    }
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  const authorData = {
    name: form.value.name.trim(),
    bio: form.value.bio.trim(),
    avatarUrl: uploadedImageUrl.value || form.value.avatarUrl.trim() || placeholderImage
  }

  try {
    if (isEditing.value) {
      await authors.update(normalizeId(props.id), authorData) // Use normalizeId here
    } else {
      await authors.create(authorData)
    }
    
    router.push('/admin/authors')
  } catch (error) {
    console.error('Error saving author:', error)
  }
}

const loadData = async () => {
  await Promise.all([
    authors.fetchList(),
    books.fetchList()
  ])
  
  if (isEditing.value) {
    await loadAuthorData()
  }
}

watch(() => props.id, loadAuthorData)

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
</style>