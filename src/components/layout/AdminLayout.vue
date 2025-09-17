 <template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-gray-50">
    <!-- Top Bar -->
    <header class="bg-white shadow-sm border-b border-gray-200 h-16 flex-shrink-0 z-30">
      <div class="flex items-center justify-between h-full px-6">
        <!-- Breadcrumb -->
        <div class="flex items-center space-x-2 text-sm">
          <router-link to="/admin" class="text-gray-500 hover:text-gray-700">
            Admin
          </router-link>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-gray-800 font-medium capitalize">
            {{ currentPageTitle }}
          </span>
        </div>

        <!-- Top Bar Actions -->
        <div class="flex items-center space-x-2">
          <router-link
            to="/admin/books/new"
            class="hidden sm:inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Book
          </router-link>
          <router-link
            to="/admin/authors/new"
            class="hidden sm:inline-flex items-center px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Author
          </router-link>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 bg-gray-50 p-4 overflow-x-hidden">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentPageTitle = computed(() => {
  const path = route.path
  if (path === '/admin') return 'Dashboard'
  if (path.includes('/books')) return 'Books'
  if (path.includes('/authors')) return 'Authors'
  return 'Admin'
})
</script>
