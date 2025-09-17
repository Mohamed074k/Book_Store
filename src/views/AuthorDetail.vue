 <template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <!-- Loading State -->
    <div v-if="authors.loading" class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <div class="w-32 h-32 bg-gray-200/50 rounded-full animate-pulse mx-auto mb-6"></div>
            <div class="h-8 bg-gray-200/50 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div class="h-6 bg-gray-200/50 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="glass-effect h-64 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="authors.error" class="py-20">
      <div class="container mx-auto px-4 text-center">
        <div class="glass-effect border border-red-300 rounded-3xl p-8 max-w-md mx-auto shadow-xl">
          <div class="text-red-600 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Author Not Found</h3>
          <p class="text-gray-600 mb-6">{{ authors.error }}</p>
          <button
            @click="$router.push('/authors')"
            class="btn-primary text-white px-6 py-3 rounded-xl hover-lift shadow-lg"
          >
            Back to Authors
          </button>
        </div>
      </div>
    </div>

    <!-- Author Detail -->
    <div v-else-if="author" class="py-20">
      <!-- Breadcrumb -->
      <div class="container mx-auto px-4 mb-8">
        <nav class="flex space-x-2 text-sm text-gray-600 animate-fade-in">
          <router-link to="/" class="hover:text-purple-600 transition-colors">Home</router-link>
          <span>/</span>
          <router-link to="/authors" class="hover:text-purple-600 transition-colors">Authors</router-link>
          <span>/</span>
          <span class="text-gray-800">{{ author.name }}</span>
        </nav>
      </div>

      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Author Header -->
          <div class="text-center mb-16 animate-fade-in-up">
            <div class="relative inline-block mb-6">
              <img
                :src="author.avatarUrl"
                :alt="author.name"
                class="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-xl mx-auto transition-transform duration-500 hover:scale-110"
                @error="handleImageError"
              />
              <div class="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 hover:from-purple-400/30 hover:to-pink-400/30 transition-all duration-300 animate-pulse-subtle"></div>
            </div>
            
             
            <p class="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              {{ author.bio }}
            </p>

            <!-- Author Stats -->
            <div class="flex justify-center space-x-8 mb-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-1">{{ authorBooks.length }}</div>
                <div class="text-gray-600 font-medium">Published Books</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-pink-600 mb-1">{{ formatDate(author.createdAt) }}</div>
                <div class="text-gray-600 font-medium">Member Since</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap justify-center gap-4">
              <button class="btn-primary text-white px-8 py-3 rounded-2xl font-semibold hover-lift shadow-lg">
                Follow Author
              </button>
              <button 
                @click="shareAuthor"
                class="btn-accent text-white px-8 py-3 rounded-2xl font-semibold hover-lift shadow-lg"
              >
                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                Share Profile
              </button>
            </div>
          </div>

          <!-- Author's Books -->
          <div v-if="authorBooks.length > 0" class="mb-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
              Books by {{ author.name }}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                v-for="(book, index) in authorBooks"
                :key="book.id"
                class="glass-effect rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up card-hover"
                :style="{ animationDelay: `${index * 150}ms` }"
                @click="goToBook(book.id)"
              >
                <!-- Book Cover -->
                <div class="relative overflow-hidden rounded-t-3xl">
                  <img
                    :src="book.coverUrl"
                    :alt="book.title"
                    class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    @error="handleBookImageError"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 text-white">
                      <p class="text-sm font-medium">Click to read more</p>
                    </div>
                  </div>
                  <!-- Year Badge -->
                  <div class="absolute top-4 right-4 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {{ book.year }}
                  </div>
                </div>

                <!-- Book Details -->
                <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {{ book.title }}
                  </h3>
                  
                  <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    {{ book.description }}
                  </p>
                  
                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="tag in book.tags"
                      :key="tag"
                      class="px-3 py-1 bg-purple-100/70 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200/70 transition-colors duration-300"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Action Button -->
                  <button class="w-full btn-primary text-white py-3 rounded-xl font-medium hover-lift shadow-lg">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Books State -->
          <div v-else class="text-center py-16">
            <div class="text-gray-400 mb-6">
              <svg class="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">No Published Books Yet</h3>
            <p class="text-gray-600 mb-6">This author hasn't published any books in our collection yet. Check back soon!</p>
          </div>

          <!-- Author Details Card -->
          <div class="glass-effect rounded-3xl shadow-xl p-8 animate-fade-in-up">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Author Information</h2>
            <div class="grid md:grid-cols-2 gap-6 text-sm">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthorsStore } from '@/stores/authors'
import { useBooksStore } from '@/stores/books'

const route = useRoute()
const router = useRouter()
const authors = useAuthorsStore()
const books = useBooksStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const author = computed(() => authors.selected)

const authorBooks = computed(() => {
  if (author.value) {
    return books.booksByAuthorId(author.value.id)
  }
  return []
})

const formatDate = (dateString) => {
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
  event.target.src = 'https://via.placeholder.com/128x128/e5e7eb/9ca3af?text=Author'
}

const handleBookImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x400/e5e7eb/9ca3af?text=No+Image'
}

const goToBook = (id) => {
  router.push({ name: 'BookDetail', params: { id: id.toString() } })
}

const shareAuthor = () => {
  if (navigator.share && author.value) {
    navigator.share({
      title: `${author.value.name} - Author Profile`,
      text: `Check out ${author.value.name}'s author profile and books`,
      url: window.location.href
    }).catch(console.error)
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!')
    }).catch(console.error)
  }
}

const loadAuthorAndBooks = async () => {
  const authorId = parseInt(props.id)
  
   if (authors.list.length === 0) {
    await authors.fetchList()
  }
  if (books.list.length === 0) {
    await books.fetchList()
  }
  
  // Set the selected author
  const foundAuthor = authors.authorById(authorId)
  if (foundAuthor) {
    authors.selected = foundAuthor
  } else {
    await authors.fetchById(authorId)
  }
}

watch(() => props.id, loadAuthorAndBooks, { immediate: true })

onMounted(loadAuthorAndBooks)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>