<!-- src/views/NotFound.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="floating-element absolute top-20 left-10 text-4xl">📚</div>
      <div class="floating-element absolute top-40 right-20 text-4xl">📖</div>
      <div class="floating-element absolute bottom-32 left-1/4 text-4xl">❓</div>
      <div class="floating-element absolute bottom-20 right-1/3 text-4xl">🔍</div>
    </div>
    
    <div class="text-center max-w-lg relative z-10">
      <!-- 404 Illustration -->
      <div class="mb-8 animate-bounce-in">
        <div class="text-9xl font-bold text-gradient-primary mb-4">404</div>
        <div class="text-gray-400">
          <div class="w-32 h-32 mx-auto bg-gradient-card rounded-3xl flex items-center justify-center shadow-xl">
            <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="animate-fade-in-up">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void. 
          Perhaps it's exploring a different chapter?
        </p>

        <!-- Action Buttons -->
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <router-link
            to="/"
            class="btn-primary text-white px-8 py-4 rounded-2xl font-semibold hover-lift shadow-xl inline-flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Go Home
          </router-link>
          
          <router-link
            to="/books"
            class="btn-accent text-white px-8 py-4 rounded-2xl font-semibold hover-lift shadow-xl inline-flex items-center"
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
            class="text-gray-500 hover:text-purple-600 transition-colors duration-300 font-medium"
          >
            ← Go back to previous page
          </button>
        </div>

        <!-- Fun Message -->
        <div class="mt-8 p-6 glass-effect rounded-2xl shadow-lg">
          <p class="text-gray-600 italic">
            "Not all those who wander are lost, but this page definitely is!" 📚✨
          </p>
        </div>
      </div>
    </div>
  </div>
</template>