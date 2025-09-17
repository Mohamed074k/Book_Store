 <template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
    <!-- Hero Section -->
    <section class="bg-gradient-hero text-white py-16 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="floating-element absolute top-20 left-10 text-3xl">👤</div>
        <div class="floating-element absolute top-40 right-20 text-3xl">✍️</div>
        <div class="floating-element absolute bottom-32 left-1/4 text-3xl">📝</div>
        <div class="floating-element absolute bottom-20 right-1/3 text-3xl">🎨</div>
      </div>
      
      <div class="container mx-auto px-4 relative">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4 animate-fade-in-up">
            Meet Our Authors
          </h1>
          <p class="text-xl opacity-90 mb-8 animate-fade-in-up animation-delay-200">
            Discover the brilliant minds behind your favorite stories
          </p>
          
          <!-- Enhanced Search -->
          <div class="max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Search authors by name or bio..."
                class="w-full pl-14 pr-14 py-4 rounded-2xl text-gray-800 placeholder-purple-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 transition-all duration-300 transform focus:scale-105 bg-white/95 backdrop-blur-sm border border-white/50 hover:border-white/70"
              />
              <!-- Clear Search Button -->
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-400 hover:text-purple-600 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Search Summary -->
            <div v-if="searchQuery" class="mt-4 animate-fade-in-up animation-delay-500">
              <div class="glass-effect px-4 py-2 rounded-full text-white text-sm border border-white/30 inline-block">
                <span class="opacity-80">Searching for:</span> 
                <span class="font-medium">{{ searchQuery }}</span>
                <button @click="clearSearch" class="ml-2 hover:text-red-300">
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Results Count -->
            <div v-if="!authors.loading" class="mt-4 animate-fade-in-up animation-delay-600">
              <p class="text-white/80 text-sm">
                {{ filteredAuthors.length }} {{ filteredAuthors.length === 1 ? 'author' : 'authors' }} found
              </p>
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
            class="glass-effect rounded-3xl shadow-xl overflow-hidden animate-pulse hover-lift"
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
          <div class="glass-effect border border-red-300 rounded-3xl p-8 max-w-md mx-auto shadow-xl">
            <div class="text-red-600 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
            <p class="text-gray-600 mb-6">{{ authors.error }}</p>
            <button
              @click="loadAuthors"
              class="btn-primary text-white px-6 py-3 rounded-xl hover-lift shadow-lg"
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
            class="glass-effect rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up card-hover"
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
                  class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-purple-200/50 group-hover:border-purple-300/70 transition-all duration-300 shadow-lg"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-tr from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-subtle"></div>
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
                  <div class="font-bold text-pink-600 text-lg">{{ formatDate(author.createdAt) }}</div>
                  <div class="text-gray-500">Joined</div>
                </div>
              </div>

              <!-- Action Button -->
              <button class="w-full btn-primary text-white py-3 rounded-xl font-medium hover-lift shadow-lg">
                View Profile
              </button>
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
              class="btn-primary text-white px-8 py-3 rounded-xl hover-lift shadow-lg"
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Section -->
    <section v-if="filteredAuthors.length > 0" class="py-16 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-primary rounded-full animate-floating"></div>
        <div class="absolute bottom-20 right-16 w-24 h-24 bg-gradient-accent rounded-full animate-floating animation-delay-300"></div>
      </div>
      
      <div class="container mx-auto px-4 relative">
        <h2 class="text-4xl font-bold text-center mb-12 text-gradient-primary animate-fade-in-up">Why Our Authors Matter</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center p-8 glass-effect rounded-3xl shadow-xl hover-lift animate-fade-in-up">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Creative Vision</h3>
            <p class="text-gray-600">Each author brings unique perspectives and storytelling approaches.</p>
          </div>
          <div class="text-center p-8 glass-effect rounded-3xl shadow-xl hover-lift animate-fade-in-up animation-delay-200">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-accent rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Rich Stories</h3>
            <p class="text-gray-600">Our authors craft compelling narratives that captivate readers worldwide.</p>
          </div>
          <div class="text-center p-8 glass-effect rounded-3xl shadow-xl hover-lift animate-fade-in-up animation-delay-400">
            <div class="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const formatDate = (dateString) => {
  return new Date(dateString).getFullYear()
}

const goToAuthor = (id) => {
  router.push({ name: 'AuthorDetail', params: { id: id.toString() } })
}

const handleSearch = () => {
 }

const clearSearch = () => {
  searchQuery.value = ''
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/96x96/e5e7eb/9ca3af?text=Author'
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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>