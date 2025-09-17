 <template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p class="text-gray-600">Manage your library collection and authors</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-500">
            Last updated: {{ formatTime(new Date()) }}
          </div>
          <button
            @click="refreshData"
            class="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors duration-300"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>

    <!-- Overview Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Books -->
      <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-blue-100 rounded-2xl">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <button
            @click="showBooksTable"
            class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">Total Books</p>
          <p class="text-3xl font-bold text-blue-600 mb-2">{{ booksCount }}</p>
          <p class="text-xs text-gray-500">{{ recentBooksCount }} added this week</p>
        </div>
      </div>

      <!-- Total Authors -->
      <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animation-delay-200">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-purple-100 rounded-2xl">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <button
            @click="showAuthorsTable"
            class="text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">Total Authors</p>
          <p class="text-3xl font-bold text-purple-600 mb-2">{{ authorsCount }}</p>
          <p class="text-xs text-gray-500">{{ activeAuthorsCount }} with published books</p>
        </div>
      </div>

      <!-- Popular Genres -->
      <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animation-delay-400">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-green-100 rounded-2xl">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">Popular Genres</p>
          <p class="text-3xl font-bold text-green-600 mb-2">{{ popularGenres.length }}</p>
          <p class="text-xs text-gray-500">{{ topGenre }} is most popular</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animation-delay-600">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-orange-100 rounded-2xl">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-600 mb-1">This Month</p>
          <p class="text-3xl font-bold text-orange-600 mb-2">{{ monthlyActivity }}</p>
          <p class="text-xs text-gray-500">Total additions</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class=" grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Books Management -->
      <div class="bg-white rounded-2xl p-3 shadow-lg animate-fade-in-up animation-delay-800">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-blue-100 rounded-xl">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Books Management</h3>
              <p class="text-sm text-gray-600">Manage your book collection</p>
            </div>
          </div>
          <router-link
            to="/admin/books/new"
            class="inline-flex items-center bg-blue-600 text-white p-1 md:px-4 md:py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Book
          </router-link>
        </div>
        <div class="space-y-3">
          <router-link
            to="/admin/books"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <span class="text-sm font-medium text-gray-700">View All Books</span>
            <div class="flex items-center space-x-2">
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{{ booksCount }}</span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </router-link>
          <div class="p-3 bg-gray-50 rounded-xl">
            <div class="text-xs text-gray-600 mb-2">Recent Books:</div>
            <div class="space-y-1">
              <div
                v-for="book in recentBooks.slice(0, 3)"
                :key="book.id"
                class="flex items-center space-x-2 text-xs"
              >
                <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span class="text-gray-700 truncate">{{ book.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Authors Management -->
      <div class=" bg-white rounded-2xl p-3 shadow-lg animate-fade-in-up animation-delay-1000">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-purple-100 rounded-xl">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Authors Management</h3>
              <p class="text-sm text-gray-600">Manage author profiles</p>
            </div>
          </div>
          <router-link
            to="/admin/authors/new"
            class="inline-flex items-center bg-purple-600 text-white p-1 md:px-4 md:py-3 rounded-xl hover:bg-purple-700 transition-colors duration-300 text-sm font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Author
          </router-link>
        </div>
        <div class="space-y-3">
          <router-link
            to="/admin/authors"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <span class="text-sm font-medium text-gray-700">View All Authors</span>
            <div class="flex items-center space-x-2">
              <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{{ authorsCount }}</span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </router-link>
          <div class="p-3 bg-gray-50 rounded-xl">
            <div class="text-xs text-gray-600 mb-2">Top Authors:</div>
            <div class="space-y-1">
              <div
                v-for="author in topAuthors.slice(0, 3)"
                :key="author.id"
                class="flex items-center justify-between text-xs"
              >
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span class="text-gray-700 truncate">{{ author.name }}</span>
                </div>
                <span class="text-gray-500">{{ getAuthorBooksCount(author.id) }} books</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Books Table -->
    <div v-if="showBooksModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[80vh] overflow-hidden animate-fade-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">Books Overview</h3>
            <p class="text-gray-600">{{ booksCount }} total books</p>
          </div>
          <div class="flex items-center space-x-3">
            <router-link
              to="/admin/books/new"
              class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Book
            </router-link>
            <button
              @click="showBooksModal = false"
              class="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="overflow-y-auto max-h-96">
          <table class="w-full">
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="book in books.list.slice(0, 20)" :key="book.id" class="hover:bg-gray-50">
                <td class="px-4 py-4">
                  <div class="flex items-center space-x-3">
                    <img :src="book.coverUrl" :alt="book.title" class="w-8 h-10 object-cover rounded" />
                    <div>
                      <div class="text-sm font-medium text-gray-900 truncate max-w-48">{{ book.title }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-700">{{ getAuthorName(book.authorId) }}</td>
                <td class="px-4 py-4 text-sm text-gray-700">{{ book.year }}</td>
                <td class="px-4 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="tag in book.tags.slice(0, 2)"
                      :key="tag"
                      class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {{ tag }}
                    </span>
                    <span v-if="book.tags.length > 2" class="text-xs text-gray-500">+{{ book.tags.length - 2 }}</span>
                  </div>
                </td>
                <td class="px-4 py-4 text-center">
                  <div class="flex justify-center space-x-2">
                    <router-link
                      :to="{ name: 'AdminBookEdit', params: { id: book.id } }"
                      class="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </router-link>
                    <router-link
                      :to="{ name: 'BookDetail', params: { id: book.id } }"
                      class="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="books.list.length > 20" class="p-4 text-center">
            <router-link
              to="/admin/books"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all {{ booksCount }} books →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Authors Table -->
    <div v-if="showAuthorsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[80vh] overflow-hidden animate-fade-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">Authors Overview</h3>
            <p class="text-gray-600">{{ authorsCount }} total authors</p>
          </div>
          <div class="flex items-center space-x-3">
            <router-link
              to="/admin/authors/new"
              class="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors duration-300"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Author
            </router-link>
            <button
              @click="showAuthorsModal = false"
              class="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="overflow-y-auto max-h-96">
          <table class="w-full">
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books Count</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="author in authors.list.slice(0, 20)" :key="author.id" class="hover:bg-gray-50">
                <td class="px-4 py-4">
                  <div class="flex items-center space-x-3">
                    <img :src="author.avatarUrl" :alt="author.name" class="w-8 h-8 object-cover rounded-full" />
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ author.name }}</div>
                      <div class="text-sm text-gray-500 truncate max-w-48">{{ author.bio.substring(0, 50) }}...</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ getAuthorBooksCount(author.id) }} books
                  </span>
                </td>
                <td class="px-4 py-4 text-sm text-gray-700">{{ formatDate(author.createdAt) }}</td>
                <td class="px-4 py-4 text-center">
                  <div class="flex justify-center space-x-2">
                    <router-link
                      :to="{ name: 'AdminAuthorEdit', params: { id: author.id } }"
                      class="p-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </router-link>
                    <router-link
                      :to="{ name: 'AuthorDetail', params: { id: author.id } }"
                      class="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="authors.list.length > 20" class="p-4 text-center">
            <router-link
              to="/admin/authors"
              class="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              View all {{ authorsCount }} authors →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBooksStore } from '@/stores/books'
import { useAuthorsStore } from '@/stores/authors'

const books = useBooksStore()
const authors = useAuthorsStore()

const showBooksModal = ref(false)
const showAuthorsModal = ref(false)

const booksCount = computed(() => books.list.length)
const authorsCount = computed(() => authors.list.length)

const recentBooks = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return books.list.filter(book => new Date(book.createdAt) >= oneWeekAgo)
})

const recentBooksCount = computed(() => recentBooks.value.length)

const activeAuthorsCount = computed(() => {
  return authors.list.filter(author => 
    books.booksByAuthorId(author.id).length > 0
  ).length
})

const popularGenres = computed(() => {
  const genreCounts = {}
  books.list.forEach(book => {
    book.tags.forEach(tag => {
      genreCounts[tag] = (genreCounts[tag] || 0) + 1
    })
  })
  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, count]) => ({ genre, count }))
})

const topGenre = computed(() => {
  return popularGenres.value.length > 0 ? popularGenres.value[0].genre : 'None'
})

const monthlyActivity = computed(() => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  
  const monthlyBooks = books.list.filter(book => new Date(book.createdAt) >= oneMonthAgo)
  const monthlyAuthors = authors.list.filter(author => new Date(author.createdAt) >= oneMonthAgo)
  
  return monthlyBooks.length + monthlyAuthors.length
})

const topAuthors = computed(() => {
  return authors.list
    .map(author => ({
      ...author,
      booksCount: books.booksByAuthorId(author.id).length
    }))
    .sort((a, b) => b.booksCount - a.booksCount)
})

const getAuthorName = (authorId) => {
  const author = authors.authorById(authorId)
  return author ? author.name : 'Unknown Author'
}

const getAuthorBooksCount = (authorId) => {
  return books.booksByAuthorId(authorId).length
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showBooksTable = () => {
  showBooksModal.value = true
}

const showAuthorsTable = () => {
  showAuthorsModal.value = true
}

const refreshData = async () => {
  await Promise.all([
    books.fetchList(),
    authors.fetchList()
  ])
}

onMounted(async () => {
  await refreshData()
})
</script>
