 <template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-floating"></div>
      <div class="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-floating animation-delay-1000"></div>
      <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-floating animation-delay-500"></div>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto text-center">
      <!-- 404 Animation -->
      <div class="mb-8 animate-fade-in">
        <div class="relative inline-block">
          <h1 class="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse-subtle">
            404
          </h1>
          <div class="absolute inset-0 text-9xl md:text-[12rem] font-bold text-purple-200 animate-floating">
            404
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div class="mb-8 animate-fade-in-up animation-delay-200">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p class="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
          The page you're looking for seems to have wandered off into the digital library. 
          Let's help you find your way back to the books!
        </p>
      </div>

      <!-- Illustration -->
      <div class="mb-8 animate-fade-in-up animation-delay-400">
        <div class="inline-flex items-center justify-center w-64 h-64 bg-white/80 backdrop-blur-sm rounded-full shadow-2xl border border-white/20">
          <div class="relative">
            <svg class="w-32 h-32 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <!-- Floating question marks -->
            <div class="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
              <span class="text-white font-bold">?</span>
            </div>
            <div class="absolute -top-2 -right-6 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-bounce animation-delay-300">
              <span class="text-white font-bold text-sm">?</span>
            </div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center animate-bounce animation-delay-600">
              <span class="text-white font-bold text-xs">?</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-fade-in-up animation-delay-600">
        <router-link
          to="/"
          class="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Go Home
        </router-link>

        <router-link
          to="/books"
          class="inline-flex items-center bg-white/80 backdrop-blur-sm text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/20"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          Browse Books
        </router-link>

        <button
          @click="goBack"
          class="inline-flex items-center bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Go Back
        </button>
      </div>

      <!-- Helpful Links -->
      <div class="mt-12 animate-fade-in-up animation-delay-800">
        <p class="text-sm text-gray-500 mb-4">Looking for something specific?</p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
          <router-link to="/authors" class="text-purple-600 hover:text-purple-800 transition-colors duration-200">
            Browse Authors
          </router-link>
          <span class="text-gray-300">•</span>
          <router-link to="/about" class="text-purple-600 hover:text-purple-800 transition-colors duration-200">
            About Us
          </router-link>
          <span class="text-gray-300">•</span>
          <a href="mailto:support@library.com" class="text-purple-600 hover:text-purple-800 transition-colors duration-200">
            Contact Support
          </a>
        </div>
      </div>

      <!-- Fun Statistics -->
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in-up animation-delay-1000">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
          <div class="text-2xl font-bold text-purple-600">∞</div>
          <div class="text-xs text-gray-600">Books to explore</div>
        </div>
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
          <div class="text-2xl font-bold text-blue-600">404</div>
          <div class="text-xs text-gray-600">Error code</div>
        </div>
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
          <div class="text-2xl font-bold text-indigo-600">0</div>
          <div class="text-xs text-gray-600">Worries needed</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
   if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
 @import '../assets/styles.css';
</style>