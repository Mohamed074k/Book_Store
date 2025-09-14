<!-- src/views/NotFound.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
    <div class="text-center max-w-lg">
      <!-- 404 Illustration -->
      <div class="mb-8 animate-bounce-in">
        <div class="text-9xl font-bold text-blue-600 mb-4">404</div>
        <div class="text-gray-400">
          <svg class="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
      </div>

      <!-- Content -->
      <div class="animate-fade-in-up">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p class="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        <!-- Action Buttons -->
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <router-link
            to="/"
            class="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Go Home
          </router-link>
          
          <router-link
            to="/books"
            class="inline-flex items-center bg-white text-gray-800 border-2 border-gray-300 px-8 py-3 rounded-2xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Browse Books
          </router-link>
        </div>

        <!-- Back Button -->
        <div class="mt-8">
          <button
            @click="$router.go(-1)"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            ← Go back to previous page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
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

.animate-bounce-in {
  animation: bounce-in 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out 0.4s both;
}
</style>